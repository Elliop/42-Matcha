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
    const id1 = (await db.query(`SELECT * FROM User WHERE tmp = '${tmp}'`))[0].id
    const username1 = (await db.query(`SELECT * FROM User WHERE tmp = '${tmp}'`))[0].username
    const username2 = (await db.query(`SELECT * FROM User WHERE id = '${id2}'`))[0].username
    let act1 = `You have liked ${username2}'s profile`
    let act2 = ""
    let sql = "INSERT INTO History (user_id, act) VALUES (?, ?)";
    con.query(sql, [id1, act1], function(err, result)
    {});
    const len1 = (await db.query(`SELECT * FROM Matching WHERE id_user1 = '${id1}' AND id_user2 = '${id2}'`))
    const len2 = (await db.query(`SELECT * FROM Matching WHERE id_user2 = '${id1}' AND id_user1 = '${id2}'`))
    if (len1.length + len2.length == 0)
        act2 = `${username1} have been liked your profile`
    else
        act2 = `${username1} have been liked back your profile you may now chat`
    sql = "INSERT INTO Notif (user_id, act) VALUES (?, ?)";
    con.query(sql, [id2, act2], function(err, result)
    {});
    let num = (await db.query(`SELECT num FROM NumNotif WHERE user_id = '${id2}'`))[0].num
    num++;
    sql = "UPDATE NumNotif SET num = ? WHERE user_id = ?";
    con.query(sql, [num, id2], function (err, result) {
      if (err) throw (err)
    });
    res("done");
})

router.post('/likeHistory', async (req, res) => {
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