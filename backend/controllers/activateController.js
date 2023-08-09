const Jimp = require("jimp");
const path = require("path");
const { findUser, updateUser } = require("../services/userService");
const UserDto = require("../dtos/userDto");

const activateAccount = async (req, res) => {
  const { name, avatar } = req.body;
  if (!name || !avatar) {
    res.status(400).json({ message: "All field are required" });
  }

  const buffer = Buffer.from(
    avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
    "base64"
  );

  const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

  try {
    const jimResp = await Jimp.read(buffer);
    jimResp
      .resize(150, Jimp.AUTO)
      .write(path.resolve(__dirname, `../storage/${imagePath}`));
  } catch (err) {
    res.status(500).json({ message: "Could not process the image" });
  }

  const userId = req.user._id;
  try {
    const user = await findUser({ _id: userId });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    user.activated = true;
    user.name = name;
    user.avatar = `/storage/${imagePath}`;
    user.save();
    res.json({ user: new UserDto(user), auth: true });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};


const updateUserById = async(req, res) => {
  const { userId } = req.params;
  const { name, phone, avatar, email } = req.body;

  if (!name || !phone || !avatar || !email) {
    return res.status(400).json({ message: "All fields are required to update" });
  }

  const buffer = Buffer.from(
    avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
    "base64"
  );

  const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

  try {
    const jimResp = await Jimp.read(buffer);
    jimResp
      .resize(150, Jimp.AUTO)
      .write(path.resolve(__dirname, `../storage/${imagePath}`));
  } catch (err) {
    res.status(500).json({ message: "Could not process the image" });
  }



  try {
    const updatedUser = await updateUser(userId, { name, phone, avatar: `/storage/${imagePath}`, email });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user: new UserDto(updatedUser), auth: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


module.exports = { activateAccount, updateUserById };
