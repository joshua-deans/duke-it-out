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
    pool.query('SELECT u.*, uic.team FROM User u, Chat c, user_in_chat uic WHERE u.id = uic.user_id AND c.id = uic.chat_id' +
      ' AND c.id = ?', req.params.id, (error, results, fields) => {
        if (error) res.send(null);
        let result_arr = {};
        result_arr.team1 = results.filter(data => data.team === "team1");
        result_arr.team2 = results.filter(data => data.team === "team2");
        res.send(result_arr);
    });
};

exports.joinTeamInChat = (userInfo, roomInfo, teamName, socket) => {
  let inputs = [roomInfo.id, userInfo.id, teamName];
  pool.query('INSERT INTO user_in_chat SET chat_id=?, user_id=?, team=? ON DUPLICATE KEY UPDATE ' +
    'chat_id=' + inputs[0] + ", user_id = " + inputs[1] + ", team= '" + inputs[2] + "'" ,
    inputs,(err, results, fields) => {
      if (err) console.log(err);
      else {
          socket.to("room" + roomInfo.id).emit('joinTeamOther', userInfo, teamName);
          socket.emit('joinTeamSelfSuccess', userInfo, teamName);
      }
    });
};

exports.leaveTeamInChat = (userInfo, roomInfo, socket) => {
  let inputs = [roomInfo.id, userInfo.id];
  pool.query('DELETE FROM user_in_chat WHERE chat_id=? AND user_id=?',
    inputs,(err, results, fields) => {
      if (err) {
        console.log(err);
      } else {
        socket.to("room" + roomInfo.id).emit('leaveTeamOther', userInfo);
        socket.emit('leaveTeamSelfSuccess');
      }
    });
};