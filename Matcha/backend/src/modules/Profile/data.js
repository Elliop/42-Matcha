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

router.post('/data', async (req, res) => {
    const { tmp } = req.body;
    let checked = await checktmp(req);
    if (checked == "True")
    {
        let sql = "SELECT * FROM User WHERE tmp = ?";
        con.query(sql, [tmp], function (err, result)
        {
            if (result.length != 0)
            {
                let obj = {};
                obj.data = result;
                const id = result[0].id;
                sql = "SELECT * FROM Info WHERE user_id = ?";
                con.query(sql, [id], function (err, result)
                {
                    obj.info = result;
                    sql = "SELECT * FROM Tags WHERE user_id = ?";
                    con.query(sql, [id], function (err, result)
                    {
                        obj.tags = result;
                        sql = "SELECT fameRating FROM Rating WHERE user_id = ?";
                        con.query(sql, [id], function (err, result)
                        {
                            obj.rating = result;
                            res.send(obj);
                        });
                    });
                });

            }
            else
                console.log("Err")
        });        
    }
    else
    {
        let obj = "Logout"
        res.send(obj);
    } 
})

module.exports = router;