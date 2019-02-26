const mysql = require('mysql');
const config = require('../../config').dbconfig;
const pool = mysql.createPool(config);
let connectionErrorHandler = require('../../helpers').connectionErrorHandler;

exports.getAllChats = function(req, res){
  pool.query('SELECT * FROM Chat', (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).end();
    }
    res.status(200).send(results);
  });
};

exports.getChatById = function(req, res){
    pool.query('SELECT * FROM Chat WHERE id=' + req.params.id, function (error, results, fields) {
      if (error) {
        res.status(500).send(error);
      }
      res.status(200).send(results);
    });
};

exports.createAChat = function(req, res){
    let inputs = [req.body.roomName, req.body.team1, req.body.team2, req.body.startTime, req.body.endTime,
      req.body.userId];
    pool.query('INSERT INTO Chat SET roomName=?, team1=?, team2=?, startTime=?, endTime=?, creator_id=?',
      inputs,
      function (err, results, fields) {
        if (err) {
          res.status(500).send(err);
        } else {
          if (results.affectedRows === 0){
            res.status(400).send();
          }
          res.status(200).send(results);
        }
    });
};

exports.modifyAChat = function(req, res){
    // Updates the chat data in the database
    res.send(null);
};

exports.usersInChat = function(req, res){
    // Returns users in the chat
    pool.query('SELECT * FROM User WHERE currentChat=?' + req.params.id, function (error, results, fields) {
        if (error) res.send(null);
        res.send(results);
    });
};