const mysql = require('mysql');
const config = require('../../config');
const connection =  mysql.createConnection(config);
const bcrypt = require('bcryptjs');

exports.getUserById = (req, res) => {
    // Returns user data by ID
    connection.query('SELECT * FROM User WHERE id=?', req.params.id, function (error, results, fields) {
        if (error) res.send(null);
        res.send(results);
    });
};

exports.getAllUsers = (req, res) => {
    // Returns all user data (probably minus "expensive data")
    connection.query('SELECT * FROM User', function (error, results, fields) {
        if (error) return null;
        res.send(results);
    });
};

exports.createAUser = function(req, res){
    // returns true if user is created, false if user is not created.
    const hashedPass = bcrypt.hashSync(req.body.password, 8);
    var formInfo = [req.body.username, req.body.email, hashedPass];
    connection.query('INSERT INTO User SET username=?, email=?, hashedPassword=?',
        formInfo,
        (err, results, fields) => {
            if (err) {
                res.send(err);
            }
            else {
                res.send(results);
            }
        });
};