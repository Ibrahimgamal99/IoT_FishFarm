const connection = require('../model/database') // connect to db
// open socket 
var id;
module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('roomcode', (user_code, farmname) => {
            socket.join(user_code + farmname);
            console.log(user_code + farmname)

        });
        // send save time to raspby (fish farm)
        socket.on('timer', (user_code, farmname, timer) => {
            console.log(user_code + farmname, timer)
            io.in(user_code + farmname).emit('timer', timer)
            var sql = "UPDATE `Farm` SET `save_time`='" + timer + "' WHERE `User`='" + user_code + "' and `Farm_name`='" + farmname + "';";
            connection.query(sql, function (err, result) {
                if (err) throw err
                console.log("timer updated");
            })
        });
        // send user code & farmname & tempc & ph to raspby
        socket.on('live', (User_code, farmname, tempc, ph) => {         // recieve from emit
            tempc = tempc.toFixed(2);
            ph = ph.toFixed(2)
            io.in(User_code + farmname).emit('data', ({ farmname, tempc, ph }))
            console.log(User_code, farmname, tempc, ph)
            id = User_code
            if (tempc < 25) {
                console.log("low")
                io.in(User_code + farmname).emit('heater', 1)
            } else {
                console.log("Normal")
                io.in(User_code + farmname).emit('heater', 0)
            }
        });
        // send frame (camera steam) to raspby
        socket.on('camera', (User_code, farmname, image) => {
            // imege = frame
            io.in(User_code + farmname).emit('image', image)
        });
        socket.on('disconnect', function () {
            console.log('A respbreey pi ' + id + ' disconnected');
        });
    });
}
