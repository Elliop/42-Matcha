const con = require("../../database/db");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

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

router.post('/info', async (req, res) => {
    const {FirstName, LastName, Username, Gender, SexualP, Bio, Password, Tags, tmp} = req.body;
    let checked = await checktmp(req);  
    if (checked == "True")
    {
      let sql = "SELECT * FROM User WHERE tmp = ?";
      con.query(sql, [tmp], function (err, result)
      {
        if (result.length != 0)
        {
          const id = result[0].id;
          let hash = result[0].password;
          bcrypt.compare(Password, hash).then(function(ress)
          {
            if (ress == true)
            {
              sql = "UPDATE User SET firstName = ?, lastName = ?, username = ? WHERE tmp = ?";
              con.query(sql, [FirstName, LastName, Username, tmp], function (err, result)
              {
                sql = "UPDATE Info SET gender = ?, sexualPref = ?, bio = ? WHERE user_id = ?";
                con.query(sql, [Gender, SexualP, Bio, id], function (err, result)
                {
                  sql = "DELETE FROM Tags WHERE user_id = ?";
                  con.query(sql, [id], function (err, result)
                  {
                    Tags.forEach(element => {
                      sql = "INSERT INTO Tags (user_id, tag) VALUES (?, ?)";
                      con.query(sql, [id, element], function(err, result)
                      {
                        if (err) throw (err)
                      });
                    });
                    res.send({msg: 'Profile Updated'});
                  });
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