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
    const { tmp, id2 } = req.body;
    const db = new Database();
    const id = (await db.query(`SELECT * FROM User WHERE tmp = '${tmp}'`))[0].id
    db.query(`DELETE FROM Block WHERE blocking = '${id}' AND blocked = '${id2}'`)
})

router.post('/unblock', async (req, res) => {
    let checked = await checktmp(req);
    if (checked == "True")
    {
        await getTab(req);
        res.send({msg: 'User Unblocked Successfully'});        
    }
    else
    {
        let obj = "Logout"
        res.send(obj);
    } 
})

module.exports = router;