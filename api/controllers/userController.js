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

