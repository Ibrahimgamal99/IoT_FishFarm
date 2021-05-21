const router = require('express').Router()
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const connection = require('../model/database')
router.post("/admins", bodyParser.json(), function (req, res) {
    console.log(req.body)
    var admin = req.body.admin_code
    var name = req.body.name
    var email = req.body.email
    var phone = req.body.phone
    var sql = "UPDATE `admin` SET `Name`='" + name + "',`Email`='" + email + "',`phone`='" + phone + "' WHERE `admin_code`='" + admin + "';"
    connection.query(sql, function (err, result) {
        if (err) throw err
        console.log("admin updated");
        res.status(200).json({
            record: "admin updated"
        })
    })

});
router.post("/users", bodyParser.json(), function (req, res) {
    var user = req.body.User_code
    var name = req.body.name
    var email = req.body.email
    var phone = req.body.phone
    var addr = req.body.address
    console.log(req.body)
    var sql = "UPDATE `user` SET `Name`='" + name + "',`Email`='" + email + "',`phone`='" + phone + "',`address`='" + addr + "' WHERE `User_code`='" + user + "';"
    connection.query(sql, function (err, result) {
        if (err) throw err
        console.log("user updated");
        res.status(200).json({
            record: "user updated"
        })
    })

});


module.exports = router;
