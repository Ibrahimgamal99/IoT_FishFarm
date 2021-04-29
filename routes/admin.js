const router = require('express').Router()
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const connection = require('../model/database')
//Creat new user
router.post("/signupuser", bodyParser.json(), function (req, res) {
    console.log(req.body)

    var user = req.body.usercode
    var name = req.body.name
    var password = req.body.password
    var email = req.body.email
    var phone = req.body.phone
    var addr = req.body.address
    let pw = bcrypt.hashSync(password, 10);
    if (user) {// user is exit
        connection.query("SELECT * FROM `user` WHERE `User_code`=?", user, function (err, result) {
            if (result.length > 0) {
                console.log("user is exit");
                res.status(202).json({
                    error: "User is Exist"
                })
                if (err) throw err;
            }
            else {
                var sql = "INSERT INTO `user`(`User_code`, `Name`, `password`, `Email`, `phone`, `address`, `save_time`) VALUES ('" + user + "','" + name + "','" + pw + "','" + email + "','" + phone + "','" + addr + "','" + 30 + "');"
                connection.query(sql, function (err, result) {
                    if (err) throw err
                    console.log(user, "inserted");
                    res.status(200).json({
                        record: "User inserted"
                    })
                })
            }
        });
    }


})
router.post("/signupadmin", bodyParser.json(), function (req, res) {
    console.log(req.body)

    var admin = req.body.admincode
    var name = req.body.name
    var password = req.body.password
    var email = req.body.email
    var phone = req.body.phone
    let pw = bcrypt.hashSync(password, 10);
    if (admin) {// admin is exit
        connection.query("SELECT * FROM `admin` WHERE `admin_code`=?", admin, function (err, result) {
            if (result.length > 0) {
                console.log("admin is exit");
                res.status(202).json({
                    error: "Admin is Exist"
                })
                if (err) throw err;
            }
            else {
                var sql = "INSERT INTO `admin`(`admin_code`, `Name`, `password`, `Email`, `phone`) VALUES ('" + admin + "','" + name + "','" + pw + "','" + email + "','" + phone + "');"
                connection.query(sql, function (err, result) {
                    if (err) throw err
                    console.log("1 record inserted");
                    res.status(200).json({
                        record: "admin inserted"
                    })
                })
            }
        });
    }


})
router.post("/newfarm", bodyParser.json(), function (req, res) {
    console.log(req.body)
    var user = req.body.usercode
    var fname = req.body.Farm_name
    connection.query("SELECT * FROM `user` WHERE `User_code`=?", user, function (err, result) {
        if (result.length > 0) {
            console.log("user is Exist");
            //var sql = "SELECT * FROM `Farm` WHERE and`Farm_name`='" + fname + "';";
            connection.query("SELECT * FROM `Farm` WHERE `Farm_name`=?",fname, function (err, result) {
                if (result.length > 0) {
                    console.log("Farm name is Exist");
                    res.status(202).json({
                        error: "Farm name is Exist"
                    })
                }
                else {
                    var sql = "INSERT INTO `Farm` (`User`, `Farm_name`) VALUES ('" + user + "','" + fname + "');";
                    connection.query(sql, function (err, result) {
                        if (err) throw err
                        console.log("Fram name inserted");
                        res.status(200).json({
                            record: "Fram name inserted"
                        })
                    })
                }
                if (err) throw err;
            })

            if (err) throw err;
        }
        else {
            res.status(202).json({
                error: "User not Exist"
            })
        }
    });



})
module.exports = router;
