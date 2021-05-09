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

router.post('/location', async (req, res) => {
    const { lat, lng, tmp } = req.body;
    let checked = await checktmp(req);
    if (checked == "True")
    {
      let sql = "UPDATE User SET lat = ?, lng = ? WHERE tmp = ?";
      con.query(sql, [lat, lng, tmp], function (err, result)
      {
          if (err) throw (err)
          res.send({msg: 'Location Updated'});
      });      
    }
    else
    {
        let obj = "Logout"
        res.send(obj);
    }
})

module.exports = router;