const io = require('socket.io-client');
var SerialPort = require('serialport'); //read from usb
var NodeWebcam = require("node-webcam");
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(17, 'out');
// camera frame options
var opts = {
    width: 320,
    height: 240,
    quality: 20,
    saveShots: false,
    callbackReturn: "base64"
};
var Webcam = NodeWebcam.create(opts);
// read from /dev/ttyACM0 port 
var port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
const parsers = SerialPort.parsers
// Use a `\r\n` as a line terminator
const parser = new parsers.Readline({
    delimiter: '\r\n',
})
port.pipe(parser)
port.on('open', () => console.log('Port open')) // open socket conncection
//var socket = io.connect('http://127.0.0.1:3001');
var socket = io.connect('ws://iotfishfarm.herokuapp.com'); // herokuapp is server host 
var fs = require('fs');
var i = 1;
var User_code = "hema"; // user code = id 
var farm_name = "suze1"; // uniqe farm name
var timer = 30; // default save time in to database  
var tmp;
var result, tempr, ph, cont = 0;
// بما ان استلام البيانات بتوالي فهنا بنقسم القراءات الرقم الفرضي يعني القراءة الاولي
//و الزوجي العكس 
parser.on('data', function (x) {
    result = x
    if (cont % 2 == 0) {
        tempr = result
    } else { ph = result }

    tempr = parseFloat(tempr)      // convert
    ph = parseFloat(ph)
    cont++;
});
// send user code and farm name to server 
socket.emit('roomcode', User_code, farm_name);
socket.on('connect', () => {
    tmp = setInterval(database, timer * 60 * 1000);
    console.log(socket.connected); // true
    //change db timer
    socket.on('timer', (time) => {
        console.log('New timer ' + time)
        clearInterval(tmp)
        timer = time;
        tmp = setInterval(database, timer * 1000);
    });
    socket.on('heater', (on) => {
        console.log('heater is ' + on)
        if (on == 1) {
            LED.writeSync(1);
        } else { LED.writeSync(0); }
    });
    function database() {// send to db
        socket.emit('database', User_code, farm_name, tempr.toFixed(2), ph.toFixed(2))
        console.log(tempr.toFixed(2), ph.toFixed(2))
        i++;
    }
    function data() {// send live data 
        socket.emit('live', User_code, farm_name, tempr, ph);     // send data
        console.log("Temperature : ", tempr)
        console.log("pH : ", ph)
    } setInterval(data, 5000)
    function img() { // send 10 frame (streaming) 
        Webcam.capture("picture", function (err, image) {
            if (err) {
                throw err;
            }
            socket.emit('camera', User_code, farm_name, image)
        });
    } setInterval(img, 100)

});


