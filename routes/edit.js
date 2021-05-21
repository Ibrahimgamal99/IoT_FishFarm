const router = require('express').Router()
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const connection = require('../model/database')
router.post("/admins", bodyParser.json(), function (req, res) {
    console.log(req.body)
    var admin = req.body.admincode
    var name = req.body.name
    var email = req.body.email
    var phone = req.body.phone
//UPDATE `admin` SET `Name`='ibrahim',`Email`='fdd@gmail.com',`phone`='76454' WHERE `admin_code`='heem';
    var sql = "UPDATE `admin` SET `Name`='" + name + "',`Email`='" + email + "',`phone`='" + phone + "' WHERE `admin_code`='" + admin + "';"
    connection.query(sql, function (err, result) {
        if (err) throw err
        console.log("admin updated");
        res.status(200).json({
            record: "admin updated"
        })
    })

});



module.exports = router;
