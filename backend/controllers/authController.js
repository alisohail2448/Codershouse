const UserDto = require("../dtos/userDto.js");
const { hashOtp } = require("../services/hashService.js");
const {
  generateOtp,
  sendBySms,
  verifyOtpService,
} = require("../services/otpService.js");
const {
  generateTokens,
  storeRefreshToken,
  verifyRefreshToken,
  findRefreshToken,
  updateRefreshToken,
  removeToken,
} = require("../services/tokenService.js");
const { findUser, createUser, userService } = require("../services/userService.js");

const sendOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    res.status(400).json({ message: "Phone filled is Required" });
  }

  const otp = await generateOtp();
  const ttl = 1000 * 60 * 2; //2 Minutes
  const expires = Date.now() + ttl;
  const data = `${phone}.${otp}.${expires}`;
  const hash = hashOtp(data);

  try {
    // await sendBySms(phone, otp);
    return res.json({
      hash: `${hash}.${expires}`,
      phone,
      otp,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "message sending failed" });
  }

  res.json({ hash: hash });
};

const verifyOtp = async (req, res) => {
  const { otp, hash, phone } = req.body;

  if (!otp || !hash || !phone) {
    res.status(400).json({ message: "All fields are required" });
  }

  const [hashedOtp, expires] = hash.split(".");
  if (Date.now() > +expires) {
    res.status(400).json({ message: "OTP expired" });
  }

  const data = `${phone}.${otp}.${expires}`;

  const isValid = verifyOtpService(hashedOtp, data);

  if (!isValid) res.status(400).json({ message: "Invalid Otp" });

  let user;

  try {
    user = await findUser({ phone });
    if (!user) {
      user = await createUser({ phone });
    }
  } catch (error) {
    console.log(error);
    res.status(500).message({ message: "Db Error " });
  }

  const { accessToken, refreshToken } = generateTokens({
    _id: user._id,
    activated: false,
  });

  await storeRefreshToken(refreshToken, user._id);

  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 24 * 30,
    httpOnly: true,
  });

  res.cookie("accessToken", accessToken, {
    maxAge: 1000 * 60 * 24 * 30,
    httpOnly: true,
  });

  const userDto = new UserDto(user);
  res.json({ user: userDto, auth: true });
};

const refreshPage = async (req, res) => {
  const { refreshToken: refreshTokenFromCookie } = req.cookies;

  let userData;
  try {
    userData = await verifyRefreshToken(refreshTokenFromCookie);
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  try {
    const token = await findRefreshToken(userData._id, refreshTokenFromCookie);

    if (!token) {
      return res.status(500).json({ message: "Internal Error" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  const user = await findUser({ _id: userData._id });
  if (!user) {
    return res.status(404).json({ message: "No User Found" });
  }

  const { refreshToken, accessToken } = await generateTokens({
    _id: userData._id,
  });

  try {
    await updateRefreshToken(userData._id, refreshToken);
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }

  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 24 * 30,
    httpOnly: true,
  });

  res.cookie("accessToken", accessToken, {
    maxAge: 1000 * 60 * 24 * 30,
    httpOnly: true,
  });

  const userDto = new UserDto(user);
  res.json({ user: userDto, auth: true });
};

const logout = async (req, res) => {
  const { refreshToken } = req.cookies;
  await removeToken(refreshToken);
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  res.json({ user: null, auth: false });
};






const sendOtpByEmail = async (req, res) => {
  const { email } = req.body; // Change 'phone' to 'email'

  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }

  const otp = await generateOtp();
  const ttl = 1000 * 60 * 2; // 2 Minutes
  const expires = Date.now() + ttl;
  const data = `${email}.${otp}.${expires}`;
  const hash = hashOtp(data);

  try {
    // Send OTP to user's email using nodemailer
    // const transporter = nodemailer.createTransport({
    //   service: "YourEmailService", // e.g., "Gmail" or "SMTP"
    //   auth: {
    //     user: "your-email@example.com",
    //     pass: "your-email-password",
    //   },
    // });

    // const mailOptions = {
    //   from: "your-email@example.com",
    //   to: email,
    //   subject: "OTP Verification",
    //   text: `Your OTP is: ${otp}`,
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.log(error);
    //     res.status(500).json({ message: "Email sending failed" });
    //   } else {
    //     console.log("Email sent: " + info.response);
    //     res.json({
    //       hash: `${hash}.${expires}`,
    //       email,
    //       otp,
    //     });
    //   }
    // });
    res.json({
      hash: `${hash}.${expires}`,
      email,
      otp,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Message sending failed" });
  }
};

const verifyOtpOfEmail = async (req, res) => {
  const { otp, hash, email } = req.body; // Change 'phone' to 'email'

  if (!otp || !hash || !email) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  const [hashedOtp, expires] = hash.split(".");
  if (Date.now() > +expires) {
    res.status(400).json({ message: "OTP expired" });
    return;
  }

  const data = `${email}.${otp}.${expires}`; // Change 'phone' to 'email'

  const isValid = verifyOtpService(hashedOtp, data);

  if (!isValid) res.status(400).json({ message: "Invalid OTP" });

  let user;

  try {
    user = await findUser({ email });
    if (!user) {
      user = await createUser({ email }); 
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "DB Error" });
    return;
  }

  const { accessToken, refreshToken } = generateTokens({
    _id: user._id,
    activated: false,
  });

  await storeRefreshToken(refreshToken, user._id);

  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 24 * 30,
    httpOnly: true,
  });

  res.cookie("accessToken", accessToken, {
    maxAge: 1000 * 60 * 24 * 30,
    httpOnly: true,
  });

  const userDto = new UserDto(user);
  res.json({ user: userDto, auth: true });
};


const getAllUser = async(req, res) => {
  try {
    const users = await userService(); 
    const userDtos = users.map((user) => new UserDto(user));
    res.json({ users: userDtos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports = { sendOtp, verifyOtp, refreshPage, logout, sendOtpByEmail, verifyOtpOfEmail, getAllUser };
