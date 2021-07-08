const router = require('express').Router()
const bodyParser = require('body-parser');
const connection = require('../model/database');
const { end } = require('../model/database');
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

