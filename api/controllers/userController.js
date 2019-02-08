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
                res.status(200).send({"id": results.insertId});
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
                    res.status(200).send(JSON.stringify({"id": results[0].id}));
                }
            }
        });
};