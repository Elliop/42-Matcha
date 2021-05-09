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

const send = async (req) => new Promise(async (res, rej) => {
    const { tmp, id, msg } = req.body;
    const db = new Database();
    const id_send = (await db.query(`SELECT * FROM User WHERE tmp = '${tmp}'`))[0].id
    const username = (await db.query(`SELECT * FROM User WHERE tmp = '${tmp}'`))[0].username
    let sql = "INSERT INTO Chat (id_send, id_res, msg) VALUES (?, ?, ?)";
    con.query(sql, [id_send, id, msg], function(err, result)
    {
        if (err) throw (err)
    })
    let act = `${username} Sended You A Msg`
    let tab1 = (await db.query(`SELECT * FROM Matching WHERE id_user2 = '${id_send}' AND id_user1 = '${id}'`))
    let tab2 = (await db.query(`SELECT * FROM Matching WHERE id_user1 = '${id_send}' AND id_user2 = '${id}'`))
    if (tab1.length + tab2.length != 0)
    {
        sql = "INSERT INTO Notif (user_id, act) VALUES (?, ?)";
        con.query(sql, [id, act], function(err, result)
        {
            if (err) throw (err)
        })
        let num = (await db.query(`SELECT num FROM NumNotif WHERE user_id = '${id}'`))[0].num
        num++;
        let sql = "UPDATE NumNotif SET num = ? WHERE user_id = ?";
        con.query(sql, [num, id], function (err, result) {
          if (err) throw (err)
        });
    }
    res("done")
})

router.post('/sendmsg', async (req, res) => {
    let checked = await checktmp(req);  
    if (checked == "True")
    {
        const msg = await send(req);
        res.send(msg);
    }  
    else
    {
        let obj = "Logout"
        res.send(obj);
    }
})

module.exports = router