var mysql = require('mysql');
//Connect to Database
var connection = mysql.createConnection({
    host: 'freedb.tech',
    user: 'freedbtech_fishfarm',
    password: 'iot1234567',
    database: 'freedbtech_fishfarm'
});


connection.connect(function (err) {//check connection to database
    if (err) throw err;
    console.log('connected to mysql host')
})
module.exports = connection;
