const mysql = require('mysql');
const config = require('../../config').dbconfig;
const secret = require('../../config').secret;
let connection =  mysql.createConnection(config);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

connection.on('error', function(err) {
  console.log(err);
  connection =  mysql.createConnection(config);
});

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

exports.createUser = (req, res) => {
    // returns true if user is created, false if user is not created.
    const hashedPass = bcrypt.hashSync(req.body.password, 8);
    var formInfo = [req.body.username, req.body.email, hashedPass];
    connection.query('INSERT INTO User SET username=?, email=?, hashedPassword=?',
        formInfo,
        (err, results, fields) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                var user = {id: results.insertId, email: req.body.email, username: req.body.username};
                jwt.sign({user}, secret, { expiresIn: '3h' }, (err, token) => {
                    res.cookie('token', token, { httpOnly: true });
                    user.token = token;
                    res.status(200).send(user);
                });
            }
        });
};

exports.loginUser = (req, res) => {
    // returns true if user is created, false if user is not created.
    connection.query('SELECT * FROM User WHERE email=?',
        req.body.email,
        (err, results, fields) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                if (results.length > 1 || results.length <= 0){
                    res.status(404).send(JSON.stringify({"message": "E-mail not found"}));
                }
                if (!bcrypt.compareSync(req.body.password, results[0].hashedPassword)){
                    res.status(404).send(JSON.stringify({"message": "E-mail and password do not match!"}));
                }
                else {
                    var user = {id: results[0].id, email: results[0].email, username: results[0].username};
                    jwt.sign({user}, secret, { expiresIn: '3h' }, (err, token) => {
                        res.cookie('token', token, { httpOnly: true });
                        user.token = token;
                        res.status(200).send(user);
                    });
                }
            }
        });
};