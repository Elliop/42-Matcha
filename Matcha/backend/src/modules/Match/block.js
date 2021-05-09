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
    const { tmp, id } = req.body;
    const db = new Database();
    const id1 = (await db.query(`SELECT * FROM User WHERE tmp = '${tmp}'`))[0].id
    let result1 = (await db.query(`SELECT * FROM Block WHERE blocking = ${id} AND blocked = ${id1}`))
    let result2 = (await db.query(`SELECT * FROM Block WHERE blocked = ${id} AND blocking = ${id1}`))
    if ((result1.length + result2.length) == 0)
    {
        let sql = "INSERT INTO Block (blocking, blocked) VALUES (?, ?)";
        con.query(sql, [id1, id], function(err, result)
        {
            res({msg: 'User Have Benn blockeed a chrif'});
        });        
    }
    else
        res({msg: 'You Can\'t Block This User a Chrif'});
    
})

router.post('/block', async (req, res) => {
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
