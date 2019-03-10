const express = require('express');
const router = express.Router();

const userController = require('./controllers/userController');
const messageController = require('./controllers/messageController');
const chatController = require('./controllers/chatController');
const authController = require("./controllers/authController");
const teamController = require("./controllers/teamController");
const authMiddleware = require('../authMiddleware');

// API Code

// CHAT
// Gets information from all chats
router.get('/chat', chatController.getAllChats);

// Returns chat data by ID
router.get('/chat/:id', chatController.getChatById);

// Creates a chat
router.post('/chat', chatController.createAChat);

//TODO: Incomplete
router.put('/chat/:name', chatController.modifyAChat);

// Add user to team
router.post('/team', teamController.addUserToTeam);

// Get all users in a chat room
router.get('/chat/:id/users', teamController.getAllUsersInChat);

// User API
// Returns user data
router.get('/user/id/:id', userController.getUserById);

// Returns all user data
router.get('/user', userController.getAllUsers);
router.post('/user/create', authController.createUser);
router.post('/user/login', authController.loginUser);

router.get('/auth', authMiddleware, (req, res) => {
    res.json(req.user);
});

// Message API
// Returns currentMsg data by ID
router.get('/message/:id', messageController.getMessageById);

router.get('/message/user/:id', messageController.getMessagesByUserId);

router.get('/message/room/:id', messageController.getMessagesByRoomId);

// Returns all currentMsg data
router.get('/message', messageController.getAllMessages)
    .post('/message', (req, res) => {
    // TODO: Complete code when user creation is finished
})
    .put('/message', (req, res) => {
    // TODO: Complete code when user creation is finished
});

module.exports = router;