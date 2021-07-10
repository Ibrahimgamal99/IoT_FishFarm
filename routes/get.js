const router = require('express').Router()
const bodyParser = require('body-parser');
const e = require('cors');
const connection = require('../model/database')
const { end } = require('../model/database');

router.get("/admins", bodyParser.json(), function (req, res) {
    connection.query("SELECT * FROM `admin` ", function (err, result) {
        res.status(200).json({
            result: result
        })

    })
});

router.get("/Allusers", bodyParser.json(), function (req, res) {
    connection.query("SELECT * FROM `user` ", function (err, result) {
        res.status(200).json({
            result: result
        })
    })
});

router.get("/userhome/:name", bodyParser.json(), function (req, res) {
    var id = req.params.name
    connection.query("SELECT * FROM `Fishbowl` where `Farm_name`='" + id + "' and `date` > now() - INTERVAL 7 day", id, function (err, result) {
        res.status(200).json({
            result: result
        })

    })
});

router.get("/adminhome", bodyParser.json(), function (req, res) {
    connection.query("SELECT * FROM `user` ", function (err, user) {
        connection.query("SELECT * FROM `Farm` ", function (err, farm) {
            res.status(200).json({
                "num_users": user.length,
                "num_Frams": farm.length,
                "Farm": farm
            })
        })
    })
});

module.exports = router;
