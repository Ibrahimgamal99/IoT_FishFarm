const router = require('express').Router()
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const connection = require('../model/database')
router.put("/admins", bodyParser.json(), function (req, res) {
    console.log(req.body)
    var admin = req.body.admin_code
    var name = req.body.Name
    var email = req.body.Email
    var phone = req.body.phone
    var sql = "UPDATE `admin` SET `Name`='" + name + "',`Email`='" + email + "',`phone`='" + phone + "' WHERE `admin_code`='" + admin + "';"
    connection.query(sql, function (err, result) {
        if (err) throw err
        console.log("admin updated");
        connection.query("SELECT * FROM `admin` WHERE admin_code=?", code, function (err, result) {
            console.log("This is Admin")//المفروض يتحول علي الداش بورد
            res.status(200).json({
                result: {
                    "admin_code": result[0].admin_code,
                    "Email": result[0].Email,
                    "phone": result[0].phone,
                    "Name": result[0].Name,
                }
            })
        })

    });
})

router.put("/users", bodyParser.json(), function (req, res) {
    var user = req.body.User_code
    var name = req.body.Name
    var email = req.body.Email
    var phone = req.body.phone
    var addr = req.body.address
    console.log(req.body)
    var sql = "UPDATE `user` SET `Name`='" + name + "',`Email`='" + email + "',`phone`='" + phone + "',`address`='" + addr + "' WHERE `User_code`='" + user + "';"
    connection.query(sql, function (err, result) {
        if (err) throw err
        console.log("user updated");
        connection.query("SELECT * FROM `user` WHERE User_code=?", code, function (err, result) {
            res.status(200).json({
                result: {
                    "usercode": result[0].User_code,
                    "Name": result[0].Name,
                    "Email": result[0].Email,
                    "phone": result[0].phone,
                    "address": result[0].address,
                    "save_time": result[0].save_time,
                }
            })
        })
    })
})

module.exports = router;
