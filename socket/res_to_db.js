const connection = require('../model/database')
var id, i = 1;
module.exports = (io) => {
    io.on('connection', (socket) => {
        // console.log('a respbreey pi connected (db)');
        socket.on('database', (User_code, farmname, tempc, ph) => {
            var date = new Date();
            month = date.getMonth() + 1;
            var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            var d = date.getFullYear() + ":" + month + ":" + date.getDate();
            //save to database
            var sql = "INSERT INTO `Fishbowl`(`Farm_name`, `Temperature_sensor`, `PH_sensor`, `DATE`, `TIME`) VALUES ('" + farmname + "','" + tempc + "','" + ph + "','" + d + "','" + time + "')";
            connection.query(sql, function (err, result) {
                if (err) throw err
                console.log(' record ' + i + ' inserted');
                i++;
            })
            console.log(User_code, farmname, tempc, ph)
            id = User_code;
        });
        socket.on('disconnect', function () {
            console.log('A respbreey pi ' + id + ' disconnected');
        });
    })
}
