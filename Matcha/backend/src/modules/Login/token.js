const con = require("../../database/db");
const express = require("express");
const router = express.Router();

router.post('/token', (req, res) => {
    const { token } = req.body;
    let sql = "SELECT * FROM User WHERE token = ?";
    con.query(sql, [token], function (err, result)
    {
        if (result.length != 0)
        {
            sql = "UPDATE User SET valid = 1 WHERE token = ?";
            con.query(sql, [token], function(err, result)
            {
                res.send({token: 'Your account has been verified.'});
            });
        }
        else
            res.send({token: 'The token is not valid'});
    });
})

module.exports = router;