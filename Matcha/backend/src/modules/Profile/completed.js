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
    const completed = (await db.query(`SELECT * FROM User WHERE tmp = '${tmp}'`))[0].completed
    res(completed);    
})

router.post('/completed', async (req, res) => {
    let checked = await checktmp(req);
    if (checked == "True")
    {
        const completed = await getTab(req);
        const obj = {};
        obj.completed = completed;
        res.send(obj);        
    }
    else
    {
        let obj = "Logout"
        res.send(obj);
    } 
})

module.exports = router;