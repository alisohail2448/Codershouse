const { activateAccount, updateUserById } = require('./controllers/activateController.js');
const { sendOtp, verifyOtp, refreshPage, logout, sendOtpByEmail, verifyOtpOfEmail, getAllUser, getUserById } = require('./controllers/authController.js');
const { createRooms, getAllRooms, getSingleRoom, getUserRooms, deleteRoom } = require('./controllers/roomsController.js');
const { isAuthenticated } = require('./middlewares/authMiddleware.js');

const router = require('express').Router();


router.post('/api/send-otp', sendOtp);
router.post('/api/send-otp-email', sendOtpByEmail);
router.post('/api/verify-otp', verifyOtp);
router.post('/api/verify-otp-email', verifyOtpOfEmail);
router.post('/api/activate', isAuthenticated, activateAccount);
router.get('/api/refresh', refreshPage);
router.post('/api/logout',isAuthenticated,  logout);
router.post('/api/rooms',isAuthenticated,  createRooms);
router.get('/api/rooms', getAllRooms);
router.get('/api/rooms/:roomId', isAuthenticated, getSingleRoom);
router.get('/api/users', getAllUser);
router.get('/api/user-room', isAuthenticated, getUserRooms);
router.put("/api/users/:userId", isAuthenticated, updateUserById);
router.delete("/api/rooms/:roomId", isAuthenticated, deleteRoom);




module.exports = router;

