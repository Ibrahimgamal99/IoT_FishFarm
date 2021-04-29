const connection = require('../model/database')
module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('roomcode', (user_code, farmname) => {
            socket.join(user_code + farmname);
            console.log(user_code + farmname)

        });
        socket.on('timer', (user_code, farmname, timer) => {
            console.log(user_code + farmname, timer)
            io.in(user_code + farmname).emit('timer', timer)
            var sql = "UPDATE `user` SET `save_time`='" + timer + "' WHERE `User_code`='" + user_code + "';";
            connection.query(sql, function (err, result) {
                if (err) throw err
                console.log("timer updated");
            })
        });
        socket.on('live', (User_code, farmname, tempc, ph) => {
            tempc = tempc.toFixed(2);
            ph = ph.toFixed(2)
            io.in(User_code + farmname).emit('data', ({ farmname, tempc, ph }))
            console.log(User_code, farmname, tempc, ph)

        });
        socket.on('camera', (User_code, farmname, image) => {
            io.in(User_code + farmname).emit('image', image)

        });

    });
}
