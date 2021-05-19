var mysql = require('mysql');
//Connect to Database
var connection = mysql.createConnection({
    host: 'sql4.freemysqlhosting.net',
    user: 'sql4413446',
    password: 'EbySIKnyB3',
    database: 'sql4413446'
});

connection.connect(function (err) {//check connection to database
    if (err) throw err;
    console.log('connected to mysql host')
})
module.exports = connection;

// var connection = mysql.createConnection({
//     host: 'freedb.tech',
//     user: 'freedbtech_fishfarm',
//     password: 'iot1234567',
//     database: 'freedbtech_fishfarm'
// });