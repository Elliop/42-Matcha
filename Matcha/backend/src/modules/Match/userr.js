import Database from "../../database";
const express = require("express");
const router = express.Router();
const con = require('../../database/db');

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

const getTab = (req) => new Promise(async (res, rej) => {
    const { id, tmp } = req.body;
    const db = new Database();
    const obj = {};
    const myid = (await db.query(`SELECT * FROM User WHERE tmp = '${tmp}'`))[0].id
    const user = (await db.query(`SELECT * FROM User WHERE id = '${id}'`))[0]
    obj.UserFirstName = user.firstName;
    obj.UserLastName = user.lastName;
    obj.UserUsername = user.username;
    obj.UserPic = user.pic;
    obj.UserAdresse = user.addresse;
    obj.conn = user.isconnected;
    const info = (await db.query(`SELECT * FROM Info WHERE user_id = '${id}'`))[0]
    obj.UserGender = info.gender;
    obj.UserSexualP = info.sexualPref;
    obj.UserBirthday = info.date;
    obj.UserBio = info.bio;
    const images = (await db.query(`SELECT image FROM Images WHERE user_id = '${id}'`))
    obj.image0 = images[0].image;
    obj.image1 = images[1].image;
    obj.image2 = images[2].image;
    obj.image3 = images[3].image;
    const rating = (await db.query(`SELECT fameRating FROM Rating WHERE user_id = '${id}'`))
    obj.rating = rating[0].fameRating;
    const matching = (await db.query(`SELECT * FROM MatchReq WHERE matching = '${myid}' and matched = '${id}'`))
    const matched = (await db.query(`SELECT * FROM MatchReq WHERE matched = '${myid}' and matching = '${id}'`))
    if (matching.length != 0)
        obj.liked = "You already liked this user";
    else if (matched.length != 0)
        obj.liked = "This user have already liked you";
    else
        obj.liked = "";
    res(obj);
})

router.post('/userr', async (req, res) => {
      let checked = await checktmp(req);
      if (checked == "True")
      {
        const obj = await getTab(req);
        res.send(obj);          
      }

    else
    {
        let obj = "Logout"
        res.send(obj);
    }
})

module.exports = router;