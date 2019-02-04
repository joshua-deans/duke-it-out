const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');
const chatController = require('../controllers/chatController');

// API Code

// CHAT
// Gets information from all chats
router.get('/chat', chatController.getAllChats);

// Returns chat data by ID
router.get('/chat/:id', chatController.getChatById);

// Creates a chat
router.post('/chat/:name', chatController.createAChat);

//TODO: Incomplete
router.put('/chat/:name', chatController.modifyAChat);

router.get('/chat/:id/users', chatController.usersInChat);

// User API
// Returns user data by ID
router.get('/user/:id', userController.getUserById);

// Returns all user data
router.get('/user', userController.getAllUsers)
    .post('/user', function(req, res){
    // TODO: Update code when user creation is finished
})
    .put('/user', function(req, res){
    // TODO: Update code
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