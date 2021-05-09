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
    const data = (await db.query(`SELECT id FROM History WHERE user_id = '${id}'`))
    res(data);
})

router.post('/historyData', async (req, res) => {
    const { tmp } = req.body;
    let checked = await checktmp(req);
    if (checked == "True")
    {
        const tab = await getTab(req);
        const db = new Database();
        let obj = []
        for (let index = 0; index < tab.length; index++) {
            let data = {}
            let res = (await db.query(`SELECT * FROM History WHERE id = '${tab[index].id}'`))
            data.act = res[0].act
            data.id = index
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