const mysql = require('mysql');
const config = require('../config').dbconfig;
const connection = mysql.createConnection(config);

let dropTables = 'DROP TABLE IF EXISTS user_in_chat, chat, user, replyto, message, team';

let createUserTable = 'CREATE TABLE IF NOT EXISTS user( \
  id int(11) AUTO_INCREMENT, username varchar(30), email varchar(30), \
  hashedPassword varchar(60), \
  PRIMARY KEY(id)) ENGINE=InnoDB;';

let createChatTable = 'CREATE TABLE IF NOT EXISTS chat( \
  id int(11) AUTO_INCREMENT, name varchar(60), start datetime, \
  end datetime, creator_id int(11) REFERENCES user(id), \
  team1 varchar(45) NOT NULL, team2 varchar(45) NOT NULL, \
  PRIMARY KEY(id)) ENGINE=InnoDB;';

let createTeamTable = 'CREATE TABLE IF NOT EXISTS team( \
  id int(11) AUTO_INCREMENT, \
  roomId int REFERENCES chat(id) ON DELETE CASCADE, \
  userId int REFERENCES user(id) ON DELETE CASCADE, \
  teamName varchar(255) NOT NULL, \
  PRIMARY KEY(id)) ENGINE=InnoDB;';

let createMessageTable = 'CREATE TABLE IF NOT EXISTS message( ' +
  'id int(11) AUTO_INCREMENT, message varchar(1000), timestamp datetime, ' +
  'creator_id int(11), chat_id int(11), team enum(\'team1\',\'team2\') NOT NULL, PRIMARY KEY(id), ' +
  'CONSTRAINT fk_Creator FOREIGN KEY (creator_id) REFERENCES user(id) ON DELETE SET NULL ON UPDATE CASCADE, ' +
  'CONSTRAINT fk_Chat FOREIGN KEY (chat_id) REFERENCES chat(id) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;';

let createUserInChatTable = 'CREATE TABLE `user_in_chat` (' +
  'user_id int(11) NOT NULL, ' +
  'chat_id int(11) NOT NULL, ' +
  'team enum(\'team1\',\'team2\') DEFAULT NULL, ' +
  'PRIMARY KEY (user_id, chat_id ), ' +
  'CONSTRAINT `fk_chat_id` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, ' +
  'CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE ' +
') ENGINE=InnoDB';

connection.query(dropTables, (err, results, fields) => {
  if (err) {
    console.log(err);
  }
});

connection.query(createUserTable, (err, results, fields) => {
  if (err) {
    console.log(err);
  }
});

connection.query(createChatTable, (err, results, fields) => {
  if (err) {
    console.log(err);
  }
});

connection.query(createTeamTable, (err, results, fields) => {
  if (err) {
    console.log(err);
  }
});

connection.query(createMessageTable, (err, results, fields) => {
  if (err) {
    console.log(err);
  }
});

connection.query(createUserInChatTable, (err, results, fields) => {
  if (err) {
    console.log(err);
  }
});

connection.end(err => {
  if (err) {
    return console.log(err);
  }
});