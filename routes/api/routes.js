var express = require('express');
var router = express.Router();

const mysql = require('mysql');

const connection =  mysql.createConnection(
    {host: "duke-it-out-mysql.mysql.database.azure.com",
        user: "mysqldbadmin@duke-it-out-mysql",
        password: "nwHacks2019",
        database: "dukeitout",
        port: 3306});

// API Code

// Chat API
router.get('/chat', function(req, res){
    // Returns all chat data (probably minus "expensive data")
    // res.send("Hi");
    connection.query('SELECT * FROM Chat', function (error, results, fields) {
        if (error) res.send(null);
        res.send(results);
    });
});

router.get('/chat/:id', function(req, res){
    // Returns chat data by ID
    connection.query('SELECT * FROM Chat WHERE id=' + req.params.id, function (error, results, fields) {
        if (error) res.send(null);
        res.send(results);
    });
});

// TODO: Change to body parser from routerropriate form
router.post('/chat/:name', function(req, res){
    // Adds a new chat data to database
    // Returns null if didn't work, or returns id
    connection.query('INSERT INTO Chat SET name=?', req.params.name, function (error, results, fields) {
        if (error) res.send(null);
        res.send(results);
    });
});

router.put('/chat/:name', function(req, res){
    // Updates the chat data in the database
    connection.query('INSERT INTO Chat SET name=?', req.params.name, function (error, results, fields) {
        if (error) res.send(null);
        res.send(results);
    });
});

// User API
router.get('/user', function(req, res){
    // Returns all user data (probably minus "expensive data")
    connection.query('SELECT * FROM User', function (error, results, fields) {
        if (error) return null;
        res.send(results);
    });
});

router.get('/user/:id', function(req, res){
    // Returns user data by ID
    connection.query('SELECT * FROM Chat WHERE id=' + req.params.id, function (error, results, fields) {
        if (error) res.send(null);
        res.send(results);
    });
});

// TODO: Change to body parser from appropriate form
router.post('/user', function(req, res){
    // TODO: Update code when user creation is finished
});

router.put('/user', function(req, res){
    // TODO: Update code
});

// Message API
router.get('/message', function(req, res){
    // Returns all user data (probably minus "expensive data")
    connection.query('SELECT * FROM Message', function (error, results, fields) {
        if (error) res.send(null);
        res.send(results);
    });
});

router.get('/message/:id', function(req, res){
    // Returns user data by ID
    connection.query('SELECT * FROM Message WHERE id=' + req.params.id, function (error, results, fields) {
        if (error) res.send(null);
        res.send(results);
    });
});

// TODO: Change to body parser from appropriate form
router.post('/message', function(req, res){
    // TODO: Update code when user creation is finished
});

router.put('/message', function(req, res){
    // TODO: Update code
});

module.exports = router;