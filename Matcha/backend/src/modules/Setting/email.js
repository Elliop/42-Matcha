const con = require("../../database/db");
const express = require("express");
const bcrypt = require('bcrypt');
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

router.post('/email', async (req, res) => {
    const {email, password, tmp} = req.body;
     let checked = await checktmp(req);  
    if (checked == "True")
    {
        let sql = "SELECT * FROM User WHERE tmp = ?";
        con.query(sql, [tmp], function (err, result)
        {
            if (result.length != 0)
            {
                let hash = result[0].password;
                bcrypt.compare(password, hash).then(function(ress)
                {
                    if (ress == true)
                    {
                        // Check if email deja kayn
                        sql = "SELECT * FROM User WHERE email = ?";
                        con.query(sql, [email], function(err, result)
                        {
                            if (result.length == 0)
                            {
                                bcrypt.hash(email, 10, function(err, token)
                                {
                                    sql = "UPDATE User SET email = ?, token = ? WHERE tmp = ?";
                                    con.query(sql, [email, token, tmp], function (err, result)
                                    {
                                        res.send({msg: 'Email Updated'});
                                    });
                                });
                            }
                            else
                                res.send({msg: 'This Email address is already taken. please try another'});
                        });
                    }
                    else if (ress == false)
                        res.send({msg: 'Invalid Password'});
                });
            }
        });        
    }
    else
    {
        let obj = "Logout"
        res.send(obj);
    }
})

module.exports = router;