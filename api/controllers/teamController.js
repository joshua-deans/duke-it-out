const mysql = require('mysql');
const config = require('../../config').dbconfig;
const secret = require('../../config').secret;
let connection =  mysql.createConnection(config);

exports.addUserToTeam = (req, res) => {
  console.log(req.params);
  res.send('ok');
}