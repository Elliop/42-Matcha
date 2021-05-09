import Database from "../../database";
const express = require("express");
const con = require("../../database/db");
const router = express.Router();

let checktmp = async (req) => new Promise(async (res, rej) => {
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
    const username = (await db.query(`SELECT * FROM User WHERE tmp = '${tmp}'`))[0].username
    let msg = `${username} Have Unliked You`
    const id = (await db.query(`SELECT * FROM User WHERE tmp = '${tmp}'`))[0].id
    db.query(`DELETE FROM Matching WHERE id_user1 = '${id}' AND id_user2 = '${id2}'`)
    db.query(`DELETE FROM Matching WHERE id_user2 = '${id}' AND id_user1 = '${id2}'`)
    let sql = "INSERT INTO Notif (user_id, act) VALUES (?, ?)";
    con.query(sql, [id2, msg], function(err, result)
    {});
    let num = (await db.query(`SELECT num FROM NumNotif WHERE user_id = '${id2}'`))[0].num
    num++;
    sql = "UPDATE NumNotif SET num = ? WHERE user_id = ?";
    con.query(sql, [num, id2], function (err, result) {
      if (err) throw (err)
    });
})

router.post('/unlike', async (req, res) => {
    let checked = await checktmp(req);
    if (checked = "True")
    {
        await getTab(req);
        res.send({msg: 'User Unlicked Successfully'});        
    }
    else
    {
        let obj = "Logout"
        res.send(obj);
    } 
})

module.exports = router;