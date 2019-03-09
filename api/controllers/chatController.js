const mysql = require('mysql');
const config = require('../../config').dbconfig;
const pool = mysql.createPool(config);
let connectionErrorHandler = require('../../helpers').connectionErrorHandler;

exports.getAllChats = (req, res) => {
  pool.query('SELECT * FROM Chat', (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).end();
    }
    res.status(200).send(results);
  });
};

exports.getChatById = (req, res) => {
    pool.query('SELECT * FROM Chat WHERE id=' + req.params.id, (error, results, fields) => {
      if (error) {
        res.status(500).send(error);
      }
      if (results.length < 1){
        res.status(404).send(results);
      } else {
        res.status(200).send(results);
      }
    });
};

exports.createAChat = (req, res) => {
    let inputs = [req.body.roomName, req.body.team1, req.body.team2, req.body.startTime, req.body.endTime,
      req.body.userId];
    pool.query('INSERT INTO Chat SET name=?, team1=?, team2=?, start=?, end=?, creator_id=?',
      inputs,(err, results, fields) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          if (results.affectedRows === 0){
            res.status(400).send();
          }
          res.status(200).send(results);
        }
    });
};

exports.modifyAChat = (req, res) => {
    // Updates the chat data in the database
    res.send(null);
};

exports.usersInChat = (req, res) => {
    // Returns users in the chat
    pool.query('SELECT * FROM User WHERE currentChat=?' + req.params.id, (error, results, fields) => {
        if (error) res.send(null);
        res.send(results);
    });
};