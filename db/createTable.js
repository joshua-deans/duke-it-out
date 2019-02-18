const mysql = require('mysql');
const config = require('../config').dbconfig;
const connection = mysql.createConnection(config);

let dropTables = 'DROP TABLE IF EXISTS replyto, message, team, chat, user';

let createUserTable = 'CREATE TABLE IF NOT EXISTS user( \
  id int(11) AUTO_INCREMENT, username varchar(30), email varchar(30), \
  hashedPassword varchar(30), \
  PRIMARY KEY(id))';

let createChatTable = 'CREATE TABLE IF NOT EXISTS chat( \
  id int(11) AUTO_INCREMENT, name varchar(60), start date, \
  end date, creator_id int(11) REFERENCES user(id), \
  team1 varchar(45) NOT NULL, team2 varchar(45) NOT NULL, \
  PRIMARY KEY(id))';

let createMessageTable = 'CREATE TABLE IF NOT EXISTS message( \
  id int(11) AUTO_INCREMENT, message varchar(300), timestamp date, \
  creator_id int(11) REFERENCES user(id), chat_id int(11) REFERENCES chat(id), \
  PRIMARY KEY(id))';

let createTeamTable = 'CREATE TABLE IF NOT EXISTS team( \
  roomId int REFERENCES chat(id) ON DELETE CASCADE, \
  userId int REFERENCES user(id) ON DELETE CASCADE, \
  teamName varchar(255) NOT NULL, \
  PRIMARY KEY(roomId, userId))';

connection.query(dropTables, function(err, results, fields) {
  if (err) {
    console.log(err.message);
  }
})

connection.query(createUserTable, function(err, results, fields) {
  if (err) {
    console.log(err.message);
  }
});

connection.query(createChatTable, function(err, results, fields) {
  if (err) {
    console.log(err.message);
  }
});

connection.query(createTeamTable, function(err, results, fields) {
  if (err) {
    console.log(err.message);
  }
});

connection.query(createMessageTable, function(err, results, fields) {
  if (err) {
    console.log(err.message);
  }
});

connection.end(function(err) {
  if (err) {
    return console.log(err.message);
  }
})