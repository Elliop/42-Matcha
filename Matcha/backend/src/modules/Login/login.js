const con = require('../../database/db');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();


// Verify Token
function verifyToken(req, res, next)
{
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined')
    {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    }
    else
        res.sendStatus(403); // Forbidden
}

function checkUser(username, password, res)
{
    let sql = "SELECT * FROM User WHERE username = ?";
    con.query(sql, [username], function (err, result)
    {
        if (result.length != 0)
        {
            const FirstName = result[0].firstName;
            const LastName = result[0].lastName;
            const Username = result[0].user;
            const Email = result[0].email;
            const Pic = result[0].pic;
            const Completed = result[0].completed;
            const id = result[0].id;
            let hash = result[0].password
            const valid = result[0].valid
            sql = "UPDATE User SET isconnected = ? WHERE id = ?";
            con.query(sql, ["Connected", id], function(err, result)
            {
                if (err) throw (err)
            });
            bcrypt.compare(password, hash).then(function(ress)
            {
                if (ress == true)
                {
                    if (valid == 1)
                    {
                        jwt.sign({username: username}, 'asalah', (err , token) => {
                            let tmp = token;
                            sql = "UPDATE User SET tmp = ? WHERE username = ?";
                            con.query(sql, [tmp, username], async function (err, result)
                            {
                                res.json({ token, id, FirstName, LastName, Username, Email, Pic, Completed });
                            });
                        });
                    }
                    else
                        res.send({msg: 'Please verify your email address'});
                }
                else if (ress == false)
                    res.send({msg: 'Invalid Password'});
            });
        }
        else
            res.send({msg: 'Invalid username'});
    });
}
router.post('/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'asalah', (err, authData) => {
        if (err)
            res.sendStatus(403);
        else 
            res.json({ message: 'Post created...', authData});
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username !== undefined && password !== undefined) {
        if (typeof username === "string" && typeof password === "string")
            checkUser(username, password, res);
        else {
            return res.send("Invalid input");
        }
    }
    else {
        return res.send("No inputs");
    }
})

module.exports = router;