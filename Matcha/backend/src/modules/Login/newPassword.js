const con = require("../../database/db");
const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/newPassword', (req, res) => {
    const { password, token } = req.body;
    let sql = "SELECT password FROM User WHERE token = ?";
    con.query(sql, [token], function (err, result)
    {
        if (result.length != 0)
        {
           bcrypt.hash(password, 10, function(err, hash)
           {
                let sql = "UPDATE User SET password = ? WHERE token = ?";
                con.query(sql, [hash, token], function (err, result)
                {
                    res.send({msg: 'Your password has been updated successfully'});
                });
            });
        }
        else
            res.send({msg: 'Invalid token'});
    });
})

module.exports = router;