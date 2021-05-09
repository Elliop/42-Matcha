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

router.post('/password', async (req, res) => {
    const {NewPassword, password, tmp} = req.body;
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
                        bcrypt.hash(NewPassword, 10, function(err, NPassword)
                        {
                            sql = "UPDATE User SET password = ? WHERE tmp = ?";
                            con.query(sql, [NPassword, tmp], function (err, result)
                            {
                                res.send({msg: 'Password Updated'});
                            });
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