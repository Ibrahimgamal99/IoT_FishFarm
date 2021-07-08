const router = require('express').Router()
const bodyParser = require('body-parser');
const e = require('cors');
const connection = require('../model/database')
const { end } = require('../model/database');
router.get("/users", bodyParser.json(), function (req, res) {
    connection.query("SELECT * FROM `user` ", function (err, result) {
        console.log(result)
        res.status(200).json({
            result: result
        })

    })
});
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

router.get("/home/:name", bodyParser.json(), function (req, res) {
    var id = req.params.name
    connection.query("SELECT * FROM `Fishbowl` where `Farm_name`=?", id, function (err, result) {
        console.log(result)
        res.status(200).json({
            result: result
        })

    })
});


module.exports = router;
