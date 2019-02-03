const mysql = require('mysql');
const config = require('../../config');
const connection =  mysql.createConnection(config);

exports.getUserById = function(req, res){
    // Returns user data by ID
    connection.query('SELECT * FROM User WHERE id=' + req.params.id, function (error, results, fields) {
        if (error) res.send(null);
        res.send(results);
    });
};

exports.getAllUsers = function(req, res){
    // Returns all user data (probably minus "expensive data")
    connection.query('SELECT * FROM User', function (error, results, fields) {
        if (error) return null;
        res.send(results);
    });
};

exports.createAUser = function(req, res){
    // Returns all user data (probably minus "expensive data")
    console.log(req.body.username);
};