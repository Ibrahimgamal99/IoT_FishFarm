const router = require('express').Router()
const bodyParser = require('body-parser');
const connection = require('../model/database')

router.delete("/admins/:ac", bodyParser.json(), function (req, res) {
    console.log(req.params)
    ac = req.params.ac;
    connection.query("SELECT * FROM `admin` WHERE `admin_code`=?", ac, function (err, result) {
        if (result.length > 0) {
            var sql = "DELETE FROM `admin` WHERE `admin_code`=?"
            connection.query(sql, ac, function (err, result) {
                if (err) throw err
                console.log("Admin Delete");
                res.status(200).json({
                    record: "Admin Delete"
                })
            })
        }
        else {
            console.log("Admin not exit");
            res.status(400).json({
                error: "Admin not Exist"
            })
            if (err) throw err;
        }
    })
})

router.delete("/farms/:Farm_name", bodyParser.json(), function (req, res) {

    console.log(req.params)
    farm_name = req.params.Farm_name;

    connection.query("SELECT * FROM `Farm` WHERE `Farm_name`=?", farm_name, function (err, result) {
        if (result.length > 0) {
            var sql = "DELETE FROM `Farm` WHERE `Farm_name`=?"
            connection.query(sql, farm_name, function (err, result) {
                if (err) throw err
                console.log("Farm Deleted");
                res.status(200).json({
                    record: "Farm Deleted"
                })
            })
        }
        else {
            console.log("Farm not exit");
            res.status(400).json({
                error: "Farm not Exist"
            })
            if (err) throw err;
        }
    })


})
router.delete("/users/:User_code", bodyParser.json(), function (req, res) {

    console.log(req.params)
    uc = req.params.User_code;

    connection.query("SELECT * FROM `user` WHERE `User_code`=?", uc, function (err, result) {
        if (result.length > 0) {
            var sql = "DELETE FROM `user` WHERE `User_code`=?"
            connection.query(sql, uc, function (err, result) {
                if (err) throw err
                console.log("User Deleted");
                res.status(200).json({
                    record: "User Deleted"
                })
            })
        }
        else {
            console.log("User not exit");
            res.status(400).json({
                error: "User not Exist"
            })
            if (err) throw err;
        }
    })

})
module.exports = router;
