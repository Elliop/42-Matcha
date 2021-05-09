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
    let i = 0;
    let j = 0;
    let data = [];
    const db = new Database();
    const myid = (await db.query(`SELECT * FROM User WHERE tmp = '${tmp}'`))[0].id
    const data1 = (await db.query(`SELECT * FROM Chat WHERE id_send = '${myid}' AND id_res = '${id}'`))
    const data2 = (await db.query(`SELECT * FROM Chat WHERE id_send = '${id}' AND id_res = '${myid}'`))
    while (data1[i])
    {
        data[j] = data1[i]
        i++
        j++
    }
    i = 0;
    while (data2[i])
    {
        data[j] = data2[i]
        i++
        j++
    }
    res(data);
})

router.post('/datamsg', async (req, res) => {
    let checked = await checktmp(req);
    if (checked == "True")
    {
        const tab = await getTab(req);
        const db = new Database();
        let obj = []
        for (let index = 0; index < tab.length; index++) {
            let data = {}
            let img = (await db.query(`SELECT pic FROM User WHERE id = '${tab[index].id_send}'`))[0].pic
            data.img = img
            data.id_send = tab[index].id_send
            data.id = tab[index].id
            data.msg = tab[index].msg
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