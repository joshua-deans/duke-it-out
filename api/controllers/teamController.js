const mysql = require('mysql');
const config = require('../../config').dbconfig;
const secret = require('../../config').secret;
const pool = mysql.createPool(config);

exports.addUserToTeam = (req, res) => {
  const joinTeamInfo = [req.body.roomId, req.body.userId, req.body.teamName];
  pool.query('INSERT INTO team SET roomId=?, userId=?, teamName=?', 
    joinTeamInfo, 
    (err, results, fields) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(results);
      }
    })
}

exports.getAllUsersInChat = (req, res) => {
  pool.query('SELECT * FROM team WHERE roomId=' + req.params.id, (err, results, fields) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(results);
      res.status(200).send(results);
    }
  })
}