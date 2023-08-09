const roomModal = require("../models/roomModal");



const createRoom = async(payload) => {
    const { topic, roomType, ownerId } = payload;
    
    const room = await roomModal.create({
        topic,
        roomType,
        ownerId,
        speakers: [ownerId]
    });
    return room;
}


const getRooms = async() => {
   const rooms = await roomModal.find().populate('speakers').populate('ownerId').exec();
   return rooms;
}


const getRoom = async(roomId) => {
   const room = await roomModal.findOne({
    _id: roomId
   });
   return room;
}


const getUserRoom = async (userId) => {
    try {
      const rooms = await roomModal.find({ ownerId: userId }).populate('speakers').populate('ownerId').exec();
      return rooms;
    } catch (error) {
      throw new Error("Fetching user rooms failed");
    }
  };


const deleteRoomService = async (roomId) => {
    try {
      const rooms = await roomModal.findByIdAndDelete(roomId);
      return rooms;
    } catch (error) {
      throw new Error("deleting user rooms failed");
    }
  };
  



module.exports = { createRoom, getRooms, getRoom, getUserRoom, deleteRoomService };