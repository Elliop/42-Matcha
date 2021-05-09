import Database from "../../database";
const con = require("../../database/db");
const express = require("express");
const router = express.Router();

let tab = [];
let i = 0;

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
    const sexualPref = (await db.query(`SELECT * FROM Info WHERE user_id = '${id}'`))[0].sexualPref
    if (sexualPref != "All")
    {
        const users = (await db.query(`SELECT user_id FROM Info WHERE gender = '${sexualPref}'`))
        for (let index = 0; index < users.length; index++) {
            const completed = (await db.query(`SELECT * FROM User WHERE id = '${users[index].user_id}'`))[0].completed
            if (completed == 1)
            {
                let result = (await db.query(`SELECT * FROM Block WHERE blocked = ${id} AND blocking = ${users[index].user_id}`))
                if (result.length == 0)
                {
                    result = (await db.query(`SELECT * FROM Block WHERE blocked = ${users[index].user_id} AND blocking = ${id}`))
                    if (result.length == 0)
                    {
                        let result1 = (await db.query(`SELECT * FROM Matching WHERE id_user1 = ${users[index].user_id} AND id_user2 = ${id}`))
                        let result2 = (await db.query(`SELECT * FROM Matching WHERE id_user1 = ${id} AND id_user2 = ${users[index].user_id}`))
                        if ((result1.length + result2.length) == 0)
                        {
                            tab[i] = users[index].user_id;
                            i++;
                        }
                    }
                }
            }
        }
    }
    else
    {
        const users = (await db.query(`SELECT user_id FROM Info`))
        for (let index = 0; index < users.length; index++) {
            if (users[index].user_id == id)
                index++
            const completed = (await db.query(`SELECT * FROM User WHERE id =  '${users[index].user_id}'`))[0].completed
            if (completed == 1)
            {
                let result = (await db.query(`SELECT * FROM Block WHERE blocked = ${id} AND blocking = ${users[index].user_id}`))
                if (result.length == 0)
                {
                    result = (await db.query(`SELECT * FROM Block WHERE blocked = ${users[index].user_id} AND blocking = ${id}`))
                    if (result.length == 0)
                    {
                        let result1 = (await db.query(`SELECT * FROM Matching WHERE id_user1 = ${users[index].user_id} AND id_user2 = ${id}`))
                        let result2 = (await db.query(`SELECT * FROM Matching WHERE id_user1 = ${id} AND id_user2 = ${users[index].user_id}`))
                        if ((result1.length + result2.length) == 0)
                        {
                            tab[i] = users[index].user_id;
                            i++;
                        }
                    }
                }
            }
        }
    }
    res(tab);
    tab = [];
    i = 0;
})

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
 
function deg2rad(deg) {
    return deg * (Math.PI/180)
}

router.post('/users', async (req, res) => {
    const { tmp } = req.body; 
     let checked = await checktmp(req);
     if (checked == "True")
     {
        const db = new Database();
        let obj = []
        const tab = await getTab(req);
        for (let index = 0; index < tab.length; index++) {
            let data = {}
            let all = (await db.query(`SELECT * FROM User WHERE id = '${tab[index]}'`))
            let rating = (await db.query(`SELECT fameRating FROM Rating WHERE user_id = '${tab[index]}'`))
            data.id = all[0].id
            data.username = all[0].username
            data.pic = all[0].pic
            data.age = all[0].age
            data.rating = rating[0].fameRating
            ////////////////DISTANCE/////////////////////////
            let lat2 = all[0].lat
            let lng2 = all[0].lng
            let user = (await db.query(`SELECT * FROM User WHERE tmp = '${tmp}'`))
            let lat1 = user[0].lat
            let lng1 = user[0].lng
            let d = getDistanceFromLatLonInKm(lat1,lng1,lat2,lng2)
            let distance = ~~d
            data.distance = distance
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