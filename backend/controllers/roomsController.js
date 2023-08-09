const RoomDto = require("../dtos/roomDto");
const { createRoom, getRooms, getRoom, getUserRoom, deleteRoomService } = require("../services/roomService");



const createRooms = async(req, res) => {
   try {
    const { topic, roomType } = req.body;

    if(!topic || !roomType){
        return res.status(400).json({ message: "All fields are required!" })
    }
    
    const room = await createRoom({
        topic,
        roomType,
        ownerId: req.user._id
    })
    
    return res.json(new RoomDto(room));
   } catch (error) {
    return res.status(401).json({ message: "Room is not created" });
   }
}



const getAllRooms = async(req, res) => {
    try {
        const rooms = await getRooms();
        const allRooms = rooms.map((room) => new RoomDto(room));
        return res.json(allRooms);
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Fetching rooms error" });
    }
}


const getSingleRoom = async(req, res) => {
    try {
       const room = await getRoom(req.params.roomId)
       return res.json(room);
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Fetching room error" });
    }
}


const getUserRooms = async (req, res) => {
    try {
      const userId = req.user._id; 
      const rooms = await getUserRoom(userId);
      const userRooms = rooms.map((room) => new RoomDto(room));
      return res.json(userRooms);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Fetching user rooms error" });
    }
  };


  const deleteRoom = async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const result = await deleteRoomService(roomId);

        if (result) {
            return res.json({ message: "Room deleted successfully" });
        } else {
            return res.status(404).json({ message: "Room not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



module.exports = { createRooms, getAllRooms, getSingleRoom, getUserRooms, deleteRoom };