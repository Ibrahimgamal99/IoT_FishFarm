var mysql = require('mysql');
//Connect to Database
// var connection = mysql.createConnection({
//     host: 'freedb.tech',
//     user: 'freedbtech_fishfarm',
//     password: 'iot1234567',
//     database: 'freedbtech_fishfarm'
// });

//Connect to Database
try {
    var connection = mysql.createConnection({
        host: 'remotemysql.com',
        user: '9jX1gUkrTN',
        password: 'G85Cv3rSpj',
        database: '9jX1gUkrTN'
    });

} catch (error) {
    console.log(error)
}

connection.connect(function (err) {//check connection to database
    if (err) throw err;
    console.log('connected to mysql host')
})
module.exports = connection;
