const con = require("../../database/db");
const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post("/register", (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  if (username !== undefined && password !== undefined && firstName !== undefined && lastName !== undefined && email !== undefined) {
    if (typeof username === "string" && typeof password === "string" && typeof firstName === "string" && typeof lastName === "string" && typeof email === "string")
    {
      // Check if usrname deja kayn
      let sql = "SELECT * FROM User WHERE username = ?";
      con.query(sql, [username], function(err, result)
      {
        if (result.length == 0)
        {
          // Check if email deja kayn
          sql = "SELECT * FROM User WHERE email = ?";
          con.query(sql, [email], function(err, result)
          {
            if (result.length == 0)
            {
              // hash password
              bcrypt.hash(password, 10, function(err, hash)
              {
                // token
                bcrypt.hash(email, 10, function(err, token)
                {
                  const pic = "http://localhost:6937/pic.png"
                  // database
                  sql = "INSERT INTO User (firstName, lastName, username, email, password, token, pic) VALUES (?, ?, ?, ?, ?, ?, ?)";
                  con.query(sql, [firstName, lastName, username, email, hash, token, pic], function(err, result)
                  {
                    // sen mail
                    const transporter = nodemailer.createTransport({
                      service: 'gmail',
                      auth: {
                        user: 'matcha.danon@gmail.com',
                        pass: 'rldicasizzqumdhi'
                      }
                    });
                    const mailOptions = {
                      from: 'Matcha@gmail.com',
                      to: email,
                      subject: 'Email Verfication',
                      text: `<a href='http://localhost:3000/token?token=${token}'>Confirm</a>`
                    };
                    transporter.sendMail(mailOptions, function(error, info)
                    {
                      if (error)
                        console.log(error);
                    });
                    res.send({msg: 'A verification email has been sent to you'});
                    if (err)
                      throw (err);
                  });
                }); 
              });
            }
            else
              res.send({msg: 'This Email address is already taken. please try another'});
          });
        }
        else
          res.send({msg: 'This Username is already taken. please try another'});
      });
    }
    else {
        return res.send("Invalid input");
    }
}
else {
    return res.send("No inputs");
}

});

module.exports = router;