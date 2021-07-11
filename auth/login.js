const router = require('express').Router()
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const connection = require('../model/database')
//login
router.post("/login", bodyParser.json(), function (req, res) {
    console.log(req.body)
    var code = req.body.code
    var password = req.body.password
    var type = req.body.type;
    // if user select type user send 1
    if (type == 1) { 
        // check if user exist 
        connection.query("SELECT * FROM `user` WHERE User_code=?", code, function (err, result) {
            if (result.length > 0) {//if exist convert string paswd to hash code 
                if (bcrypt.compareSync(password, result[0].password)) {
                    console.log("This is user")//المفروض يتحول علي الداش بورد
                    connection.query("SELECT * FROM `Farm` WHERE User=?", code, function (err, farm) {
                        // send user info to frontend 
                        res.status(200).json({
                            result: {
                                "usercode": result[0].User_code,
                                "Name": result[0].Name,
                                "Email": result[0].Email,
                                "phone": result[0].phone,
                                "address": result[0].address,                                
                                "save_time": result[0].save_time,
                                "Farm_num": farm
                            }
                        })
                    })
                }
                else {
                    // send Wrong Password to frontend 
                    console.log("Password dont match")//المفروض يتطبع الرسالة 
                    res.status(202).json({
                        error: "Wrong Password"
                    })
                }
                if (err) throw err;
            }
            else {
                // send user dont Exist to frontend
                console.log("User dont Exist")
                res.status(202).json({
                    error: "User dont Exist"
                })
            }
        });
    } else {
        // if type = 2 this is admin 
        connection.query("SELECT * FROM `admin` WHERE admin_code=?", code, function (err, result) {
            if (result.length > 0) {
                //if exist convert string paswd to hash code 
                if (bcrypt.compareSync(password, result[0].password)) {
                    console.log("This is Admin")//المفروض يتحول علي الداش بورد
                    res.status(200).json({
                        result: {
                            "admin_code": result[0].admin_code,
                            "Email": result[0].Email,
                            "phone": result[0].phone,
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