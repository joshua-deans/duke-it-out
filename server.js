const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 5000;

const mysql = require('mysql');
const connection =  mysql.createConnection(
    {host: "duke-it-out-mysqldbserver.mysql.database.azure.com",
      user: "mysqldbuser@duke-it-out-mysqldbserver",
      password: "nwHacks2019",
      database: "dukeitout",
      port: 3306});

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

// API Code

// Chat API
app.get('/api/chat', function(req, res){
    // Returns all chat data (probably minus "expensive data")
    connection.query('SELECT * FROM Chat', function (error, results, fields) {
        if (error) return null;
        res.send(results);
    });
});

app.get('/api/chat/:id', function(req, res){
    // Returns chat data by ID
    connection.query('SELECT * FROM Chat WHERE id=' + req.params.id, function (error, results, fields) {
        if (error) res.send(null);
        res.send(results);
    });
});

// TODO: Change to body parser from appropriate form
app.post('/api/chat/:name', function(req, res){
    // Adds a new chat data to database
    // Returns null if didn't work, or returns id
    connection.query('INSERT INTO Chat SET name=?', req.params.name, function (error, results, fields) {
        if (error) res.send(null);
        res.send(results);
    });
});

app.put('/api/chat/:name', function(req, res){
    // Updates the chat data in the database
    connection.query('INSERT INTO Chat SET name=?', req.params.name, function (error, results, fields) {
        if (error) res.send(null);
        res.send(results);
    });
});

// User API
app.get('/api/user', function(req, res){
    // Returns all user data (probably minus "expensive data")
    connection.query('SELECT * FROM User', function (error, results, fields) {
        if (error) return null;
        res.send(results);
    });
});

app.get('/api/user/:id', function(req, res){
    // Returns user data by ID
    connection.query('SELECT * FROM Chat WHERE id=' + req.params.id, function (error, results, fields) {
        if (error) res.send(null);
        res.send(results);
    });
});

// TODO: Change to body parser from appropriate form
app.post('/api/user', function(req, res){
    // TODO: Update code when user creation is finished
});

app.put('/api/user', function(req, res){
    // TODO: Update code
});

// Message API
app.get('/api/message', function(req, res){
    // Returns all user data (probably minus "expensive data")
    connection.query('SELECT * FROM Message', function (error, results, fields) {
        if (error) return null;
        res.send(results);
    });
});

app.get('/api/message/:id', function(req, res){
    // Returns user data by ID
    connection.query('SELECT * FROM Message WHERE id=' + req.params.id, function (error, results, fields) {
        if (error) res.send(null);
        res.send(results);
    });
});

// TODO: Change to body parser from appropriate form
app.post('/api/message', function(req, res){
    // TODO: Update code when user creation is finished
});

app.put('/api/message', function(req, res){
    // TODO: Update code
});

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });

app.listen(port, () => console.log(`Listening on port ${port}`));