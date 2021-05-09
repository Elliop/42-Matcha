import Database from "../../database";
const express = require("express");
const con = require("../../database/db");
const router = express.Router();

const checktmp = async (req) => new Promise(async (res, rej) => {
    const { tmp } = req.body;    
    let sql = "SELECT * FROM User WHERE tmp = ?";
    con.query(sql, [tmp], function (err, result)
    {
        if (result.length != 0)
        {
            let tab = "True"
            res(tab);
        }
        else
        {
            let tab = "False"
            res(tab);
        }
    });
  })

const getTab = async (req) => new Promise(async (res, rej) => {
    const { tmp } = req.body;
    const db = new Database();
    const id = (await db.query(`SELECT * FROM User WHERE tmp = '${tmp}'`))[0].id

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    let sql = "UPDATE User SET isconnected = ? WHERE id = ?";
    con.query(sql, [dateTime, id], function(err, result)
    {
        if (err) throw (err)
    });
    res("done")
})

router.post('/logout', async (req, res) => {
    let checked = await checktmp(req);
    if (checked == "True")
        await getTab(req);
    else
    {
        let obj = "Logout"
        res.send(obj);
    } 
})

module.exports = router;