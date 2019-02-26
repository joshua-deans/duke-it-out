const mysql = require('mysql');
const config = require('./config').dbconfig;

exports.connectionErrorHandler = (connection, err) => {
  console.log(err);
  connection = mysql.createConnection(config);
  connection.on('error', function (err) {
    console.log(err.code);
    connection = mysql.createConnection(config);
  });
};

