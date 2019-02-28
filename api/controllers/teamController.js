const mysql = require('mysql');
const config = require('../../config').dbconfig;
const secret = require('../../config').secret;
const pool = mysql.createPool(config);

exports.addUserToTeam = (req, res) => {
  pool.query()
  res.status(200).send({message: 'hello Yall'});
}