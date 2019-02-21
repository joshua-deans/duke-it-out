const mysql = require('mysql');
const config = require('../../config').dbconfig;
let connection =  mysql.createConnection(config);

connection.on('error', function(err) {
  console.log(err);
  connection =  mysql.createConnection(config);
});

exports.getMessageById = function(req, res){
    connection.query('SELECT * FROM Message WHERE id=' + req.params.id, function (error, results, fields) {
        if (error) res.send(null);
        res.send(results);
    });
};

exports.getAllMessages = function(req, res){
    connection.query('SELECT * FROM Message', function (error, results, fields) {
        if (error) res.send(null);
        res.send(results);
    });
};