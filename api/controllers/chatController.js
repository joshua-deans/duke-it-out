const mysql = require('mysql');
const config = require('../../config');
const connection =  mysql.createConnection(config);

exports.getAllChats = function(req, res){
    connection.query('SELECT * FROM Chat', function (error, results, fields) {
        if (error) res.send(null);
        res.send(results);
    });
};

exports.getChatById = function(req, res){
    connection.query('SELECT * FROM Chat WHERE id=' + req.params.id, function (error, results, fields) {
        if (error) res.send(null);
        res.send(results);
    });
};

exports.createAChat = function(req, res){
    // Adds a new chat data to database
    // Returns null if didn't work, or returns id
    connection.query('INSERT INTO Chat SET name=?', req.params.name, function (error, results, fields) {
        if (error) res.send(null);
        res.send(results);
    });
};

exports.modifyAChat = function(req, res){
    // Updates the chat data in the database
    res.send(null);
};

exports.usersInChat = function(req, res){
    // Returns users in the chat
    connection.query('SELECT * FROM User WHERE currentChat=?' + req.params.id, function (error, results, fields) {
        if (error) res.send(null);
        res.send(results);
    });
};