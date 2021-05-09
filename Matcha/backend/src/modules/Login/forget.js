const con = require("../../database/db");
const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/forget', (req, res) => {
    const { email } = req.body;
    if (email !== undefined) {
        if (typeof email === "string")
        {
            let sql = "SELECT * FROM User WHERE email = ?";
            con.query(sql, [email], function (err, result)
            {
                if (result.length != 0)
                {
                    const valid = result[0].valid;
                    if (valid == 1)
                    {
                        const token = result[0].token;
                        // send mail
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
                            subject: 'Forget Password',
                            text: `http://localhost:3000/forget?token=${token}`
                        };
                        transporter.sendMail(mailOptions, function(error, info)
                        {
                            if (error)
                                console.log(error);
                        });
                        res.send({msg: 'An email sent to you to reset your password'});
                    }
                    else
                        res.send({msg: 'Please verify your email address'});
                }
                else
                    res.send({msg: 'Email not found'});
            });
        }
        else {
            return res.send("Invalid input");
        }
    }
    else {
        return res.send("No inputs");
    }
})

module.exports = router;