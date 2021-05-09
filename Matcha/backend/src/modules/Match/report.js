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
    const { tmp, id, reason } = req.body;
    const db = new Database();
    const id_reporting = (await db.query(`SELECT * FROM User WHERE tmp = '${tmp}'`))[0].id
    let result1 = (await db.query(`SELECT * FROM Report WHERE reporting = ${id_reporting} AND reported = ${id}`))
    if (result1.length == 0)
    {
        let sql = "INSERT INTO Report (reporting, reported, ` Reason`) VALUES (?, ?, ?)";
        con.query(sql, [id_reporting, id, reason], function(err, result)
        {
            if (err) throw (err)
            res({msg: 'User Reported Thank You'});
        });        
    }
    else
        res({msg: 'You Alredy Reported This User'});
})

router.post('/report', async (req, res) => {
    let checked = await checktmp(req);  
    if (checked == "True")
    {
        const msg = await getTab(req);
        res.send(msg);        
    }  
    else
    {
        let obj = "Logout"
        res.send(obj);
    }
})

module.exports = router;