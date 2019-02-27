const mysql = require('mysql');
const config = require('../../config').dbconfig;
const secret = require('../../config').secret;
const pool = mysql.createPool(config);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getUserById = (req, res) => {
    // Returns user data by ID
    pool.query('SELECT * FROM User WHERE id=?', req.params.id, function (error, results, fields) {
        if (error) res.send(null);
        res.send(results);
    });
};

exports.getUserByEmail = (req, res) => {
  console.log(req);
  // Returns user data by Email
  pool.query('SELECT * FROM User WHERE email=?', req.params.email, function (error, results, fields) {
      if (error) res.send(null);
      res.send(results);
  });
};

exports.getAllUsers = (req, res) => {
    // Returns all user data (probably minus "expensive data")
    pool.query('SELECT * FROM User', function (error, results, fields) {
        if (error) return null;
        res.send(results);
    });
};

exports.createUser = (req, res) => {
    // returns true if user is created, false if user is not created.
  const hashedPass = bcrypt.hashSync(req.body.password, 8);
  const formInfo = [req.body.username, req.body.email, hashedPass];
  pool.query('INSERT INTO User SET username=?, email=?, hashedPassword=?',
        formInfo,
        (err, results, fields) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
              const user = {id: results.insertId, email: req.body.email, username: req.body.username};
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
    pool.query('SELECT * FROM User WHERE email=?',
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