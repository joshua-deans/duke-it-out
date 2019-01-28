const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 5000;

const routes = require('./routes/api/routes');

const mysql = require('mysql');
const connection =  mysql.createConnection(
    {host: "duke-it-out-mysql.mysql.database.azure.com",
      user: "mysqldbadmin@duke-it-out-mysql",
      password: "nwHacks2019",
      database: "dukeitout",
      port: 3306});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
// Set static folder
    app.use(express.static(path.join(__dirname, 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });

app.listen(port, () => console.log(`Listening on port ${port}`));