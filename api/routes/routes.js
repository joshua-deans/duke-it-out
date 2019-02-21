const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');
const chatController = require('../controllers/chatController');
const authController = require("../controllers/authController");
const teamController = require("../controllers/teamController");

const authMiddleware = require('../../authMiddleware');

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

router.get('/chat/:id/users', chatController.usersInChat);

// Add user to team
router.post('/team', teamController.addUserToTeam);

// User API
// Returns user data
router.get('/user/id/:id', userController.getUserById);

// Returns all user data
router.get('/user', userController.getAllUsers);
router.post('/user/create', authController.createUser);
router.post('/user/login', authController.loginUser);

router.get('/auth', authMiddleware, function(req, res){
    res.json(req.user);
});

// Message API
// Returns message data by ID
router.get('/message/:id', messageController.getMessageById);

// Returns all message data
router.get('/message', messageController.getAllMessages)
    .post('/message', function(req, res){
    // TODO: Complete code when user creation is finished
})
    .put('/message', function(req, res){
    // TODO: Complete code when user creation is finished
});

module.exports = router;