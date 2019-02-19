const mysql = require('mysql');
const config = require('../../config').dbconfig;
let connection =  mysql.createConnection(config);

connection.on('error', function(err) {
  console.log(err);
  connection =  mysql.createConnection(config);
});

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
    let inputs = [req.body.roomName, req.body.team1, req.body.team2, req.body.startTime, req.body.endTime,
      req.body.userId];
    connection.query('INSERT INTO Chat SET roomName=?, team1=?, team2=?, startTime=?, endTime=?, creator_id=?',
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
    connection.query('SELECT * FROM User WHERE currentChat=?' + req.params.id, function (error, results, fields) {
        if (error) res.send(null);
        res.send(results);
    });
};