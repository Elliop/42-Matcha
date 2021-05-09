import Database from "../../database";
const con = require("../../database/db");
const express = require("express");
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
    let tab = (await db.query(`SELECT blocked FROM Block WHERE blocking = '${id}'`))
    res(tab);
})

router.post('/blocked', async (req, res) => {
    let checked = await checktmp(req);
    if (checked == "True")
    {
        const db = new Database();
        let obj = []
        const tab = await getTab(req);
        for (let index = 0; index < tab.length; index++) {
            let data = {}
            let all = (await db.query(`SELECT * FROM User WHERE id = '${tab[index].blocked}'`))
            data.id = all[0].id
            data.username = all[0].username
            data.pic = all[0].pic
            obj.push(data);
        }
        res.send(obj);        
    }
    else
    {
        let obj = "Logout"
        res.send(obj);
    }
})

module.exports = router;