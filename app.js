const app = require('express')()
const path = require('path')
const cors = require("cors");// for cros err 
const server = require('http').createServer(app);//creat http server 
port =  3001;//port 
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

//const io = require('socket.io')(server,cors(),cors(corsOptions));//web socket
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});//web socket

// for cros err 
app.use(cors());
app.use(cors(corsOptions));

require('./socket/live')(io)
require('./socket/res_to_db')(io)

app.use('/', require('./auth/login'))
app.use('/user', require('./routes/users'))
app.use('/admin', require('./routes/admin'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'api.html'));
});

server.listen(process.env.PORT || port, function () {
    console.log(`listening on port ${port}...`)

});
