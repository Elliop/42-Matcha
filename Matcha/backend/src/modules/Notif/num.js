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
    let sql = "UPDATE NumNotif SET num = ? WHERE user_id = ?";
    con.query(sql, [0, id], function (err, result) {
      if (err) throw (err)
    });
    res("done");
})

router.post('/num', async (req, res) => {
    let checked = await checktmp(req);
    if (checked == "True")
    {
        const tab = await getTab(req);
        res.send(tab);        
    }
    else
    {
        let obj = "Logout"
        res.send(obj);
    } 
})

module.exports = router;