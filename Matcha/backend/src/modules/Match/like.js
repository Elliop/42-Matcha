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
    const id_matching = (await db.query(`SELECT * FROM User WHERE tmp = '${tmp}'`))[0].id
    let result1 = (await db.query(`SELECT * FROM MatchReq WHERE matching = ${id} AND  matched = ${id_matching}`))
    let score = (await db.query(`SELECT * FROM Rating WHERE user_id = '${id}'`))[0].score
    if (result1.length != 0)
    {
        let sql = "DELETE FROM MatchReq WHERE matching = ? AND  matched = ?";
        con.query(sql, [id, id_matching], function(err, result)
        {
            sql = "INSERT INTO `Matching` (`id_user1`, `id_user2`) VALUES (?, ?)";
            con.query(sql, [id, id_matching], function(err, result)
            {
                if (score < 5)
                {
                    score++;
                    sql = "UPDATE Rating SET score = ?, fameRating = ? WHERE user_id = ?";
                    con.query(sql, [score, 2, id], function(err, result)
                    {});
                }
                else if (score >= 5 && score <= 14)
                {
                    score++;
                    sql = "UPDATE Rating SET score = ?, fameRating = ? WHERE user_id = ?";
                    con.query(sql, [score, 3, id], function(err, result)
                    {});
                }
                else if (score >= 15 && score <= 49)
                {
                    score++;
                    sql = "UPDATE Rating SET score = ?, fameRating = ? WHERE user_id = ?";
                    con.query(sql, [score, 4, id], function(err, result)
                    {});
                }
                else if (score >= 50)
                {
                    score++;
                    sql = "UPDATE Rating SET score = ?, fameRating = ? WHERE user_id = ?";
                    con.query(sql, [score, 5, id], function(err, result)
                    {});
                }
                res({msg: 'User Matched Successfully, You Can Now Chat!'});
            })
        });        
    }
    else
    {
        let result2 = (await db.query(`SELECT * FROM MatchReq WHERE matched = ${id} AND  matching = ${id_matching}`))
        if (result2.length != 0)
        {
            res({msg: 'You Alredy Liked This User'});
        }
        else
        {
            let sql = "INSERT INTO `MatchReq` (`matching`, `matched`) VALUES (?, ?)";
            con.query(sql, [id_matching, id], function(err, result)
            {
                if (score < 5)
                {
                    score++;
                    sql = "UPDATE Rating SET score = ?, fameRating = ? WHERE user_id = ?";
                    con.query(sql, [score, 2, id], function(err, result)
                    {});
                }
                else if (score >= 5 && score <= 14)
                {
                    score++;
                    sql = "UPDATE Rating SET score = ?, fameRating = ? WHERE user_id = ?";
                    con.query(sql, [score, 3, id], function(err, result)
                    {});
                }
                else if (score >= 15 && score <= 49)
                {
                    score++;
                    sql = "UPDATE Rating SET score = ?, fameRating = ? WHERE user_id = ?";
                    con.query(sql, [score, 4, id], function(err, result)
                    {});
                }
                else if (score >= 50)
                {
                    score++;
                    sql = "UPDATE Rating SET score = ?, fameRating = ? WHERE user_id = ?";
                    con.query(sql, [score, 5, id], function(err, result)
                    {});
                }
                res({msg: 'User Liked Successfully'});
            })
        }
    }
})

router.post('/like', async (req, res) => {  
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