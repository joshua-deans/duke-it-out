const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mysql = require('mysql');
const port = process.env.PORT || 5000;
const connection =  mysql.createConnection(
    {host: "duke-it-out-mysqldbserver.mysql.database.azure.com",
      user: "mysqldbuser@duke-it-out-mysqldbserver",
      password: "nwHacks2019",
      database: "dukeitout",
      port: 3306});

// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
//
//   console.log('connected as id ' + connection.threadId);
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Homepage
app.get('/', function(req, res){
    res.send('<a href="/chat/1">Go to Chat</a>'); //TODO: Implement actual browsing dashboard
});

app.get('/signup', function(req, res){
    res.send('<h1>Signup</h1>');
});

app.get('/login', function(req, res){
    res.send('<h1>Login</h1>');
});

app.get('/chat/:id', function(req, res){
    res.send(req.params.id); // TODO: Implement actual chat
});

app.get('/profile/:id', function(req, res){
    res.send(req.params.id); // TODO: Implement user profile (if time)
});

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });

app.listen(port, () => console.log(`Listening on port ${port}`));