const router = require('express').Router()
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const connection = require('../model/database')
const jwt = require('jsonwebtoken')
const secret = "hemagamal"
//login
router.post("/login", bodyParser.json(), function (req, res) {
    console.log(req.body)
    var code = req.body.code
    var password = req.body.password
    var type = req.body.type;
    if (type == 1) {
        connection.query("SELECT * FROM `user` WHERE User_code=?", code, function (err, result) {
            //console.log(result)
            if (result.length > 0) {
                if (bcrypt.compareSync(password, result[0].password)) {
                    console.log("This is user")//المفروض يتحول علي الداش بورد
                    connection.query("SELECT * FROM `Farm` WHERE User=?", code, function (err, farm) {
                       // console.log(farm)
                        res.status(200).json({
                            result: {
                                "usercode": result[0].User_code,
                                "Name": result[0].Name,
                                "Farm_num": farm,
                                "save_time": result[0].save_time
                            }
                        })
                    })
                }
                else {
                    console.log("Passwords dont match")//المفروض يتطبع الرسالة 
                    res.status(202).json({
                        error: "Wrong Passwords"
                    })
                }
                if (err) throw err;
            }
            else {
                console.log("User dont Exist")
                res.status(202).json({
                    error: "User dont Exist"
                })
            }
        });
    } else {
        connection.query("SELECT * FROM `admin` WHERE admin_code=?", code, function (err, result) {
            if (result.length > 0) {
                if (bcrypt.compareSync(password, result[0].password)) {
                    console.log("This is Admin")//المفروض يتحول علي الداش بورد
                    res.status(200).json({
                        result: {
                            "Admin_code": result[0].admin_code,
                            "Name": result[0].Name,
                        }
                    })
                }
                else {
                    console.log("Passwords dont match")//المفروض يتطبع الرسالة 
                    res.status(202).json({
                        error: "Wrong Passwords"
                    })
                }
                if (err) throw err;
            }
            else {
                console.log("Admin dont Exist")
                res.status(202).json({
                    error: "Admin dont Exist"
                })
            }
        });

    }

});
module.exports = router;