const router = require('express').Router()
const bcrypt = require('bcrypt')
const ss = require('../socket/live')
const bodyParser = require('body-parser');
const connection = require('../model/database');
const { end } = require('../model/database');
var id;
router.get("/live", bodyParser.json(), function (req, res) {
    console.log(req.body)
    id = req.body.ID;
    res.status(200).json({
        ID: id,
        msg: "ok"
    })

})
router.post("/reports", bodyParser.json(), function (req, res) {
    console.log(req.body)
    fname = req.body.Farm_name;
    sdate = req.body.Start_Date;
    edate = req.body.End_Date;
    var sql = "SELECT * FROM `Fishbowl` WHERE Date >='" + sdate + "' and Date <='" + edate + "' and Farm_name='" + fname + "'";
    connection.query(sql, function (err, result) {
        if (err) throw err
        res.status(200).json({
            result: result
        })
    })


})

module.exports = router;

