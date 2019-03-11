const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const chatController = require('./api/controllers/chatController');
const messageController = require('./api/controllers/messageController');

const port = process.env.PORT || 5000;

const routes = require('./api/routes');

var corsOptions = {
    allRoutes: true,
    origin: 'http://localhost:3000',
    credentials: true,
    headers: 'content-type'
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cors());

app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
// Set static folder
    app.use(express.static(path.join(__dirname, 'client', 'build')));

    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

setupSockets();

http.listen(port, () => console.log(`Listening on port ${port}`));

function setupSockets() {
  io.on('connection', (socket) => {
    socket.on('error', err => console.log(err));
    socket.on('clientInfo', (userInfo, roomInfo) => {
      console.log("User #" + userInfo.id + " connected from room #" + roomInfo.id);
      socket.userInfo = userInfo;
      socket.roomInfo = roomInfo;
      socket.join("room" + roomInfo.id);
    });
    socket.on('joinTeamSelf', (userInfo, roomInfo, teamName) => {
      console.log("User #" + userInfo.id + " joined " + teamName + " in room #" + roomInfo.id)
      chatController.joinTeamInChat(userInfo, roomInfo, teamName, socket);
    });
    socket.on('sent message', (msg, date, userInfo, roomId) => {
      messageController.createMessage(msg, date, userInfo, roomId, socket);
    });
    socket.on('leaveTeamSelf', (userInfo, roomInfo) => {
      chatController.leaveTeamInChat(userInfo, roomInfo, socket);
    });
    socket.on('disconnect', () => {
      if (socket.roomInfo != null && socket.userInfo != null){
        console.log("User #" + socket.userInfo.id + " disconnected from room #" + socket.roomInfo.id);
        chatController.leaveTeamInChat(socket.userInfo, socket.roomInfo, socket);
      } else {
        console.log('A user disconnected');
      }
    });
  });
}