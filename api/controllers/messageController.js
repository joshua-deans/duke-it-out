const mysql = require('mysql');
const config = require('../../config').dbconfig;
const pool = mysql.createPool(config);

exports.getMessageById = (req, res) => {
  pool.query('SELECT * FROM Message WHERE id=' + req.params.id, (error, results, fields) => {
    if (error) res.status(500).end();
    res.send(results);
  });
};

exports.getMessagesByRoomId = (req, res) => {
  pool.query('SELECT Message.creator_id, User.username, User.email, Message.message, Message.timestamp, Message.team ' +
    'FROM Message INNER JOIN User ON Message.creator_id = User.id WHERE chat_id=' + req.params.id + ' ORDER BY timestamp ASC',
    (error, results, fields) => {
    if (error) res.status(500).end();
    res.send(results);
  });
};

exports.getMessagesByUserId = (req, res) => {
  pool.query('SELECT Message.creator_id, User.username, User.email, Message.message, Message.timestamp ' +
    'FROM Message INNER JOIN User ON Message.creator_id = User.id WHERE chat_id=' + req.params.id + ' ORDER BY timestamp ASC',
    (error, results, fields) => {
    if (error) res.status(500).end();
    res.send(results);
  });
};

exports.getAllMessages = (req, res) => {
  pool.query('SELECT Message.creator_id, User.username, User.email, Message.message, Message.timestamp ' +
    'FROM Message INNER JOIN User ON Message.creator_id = User.id ORDER BY timestamp ASC', (error, results, fields) => {
        if (error) {
          console.log(error);
          res.status(500).end();
        }
        res.status(200).send(results);
    });
};

exports.createMessage = (msg, date, userInfo, roomId, team, socket) => {
  let messageInfo = [msg, date, userInfo.id, roomId, team];
  pool.query('INSERT INTO Message SET message=?, timestamp=?, creator_id=?, chat_id=?, team=?',
    messageInfo, (error, results, fields) => {
    if (error) console.log(error);
    else {
      socket.to("room" + roomId).emit('verified message', msg, date, userInfo, team);
      socket.emit('verified message', msg, date, userInfo, team);
    }
  });
};