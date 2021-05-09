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

/////////// Localisation ///////////////
router.post('/loc', async (req, res) => {
    const { lat, lng, addresse, tmp } = req.body;
    let checked = await checktmp(req);
    if (checked == "True")
    {
      let sql = "UPDATE User SET lat = ?, lng = ?, addresse = ? WHERE tmp = ?";
      con.query(sql, [lat, lng, addresse, tmp], function (err, result)
      {
        if (err) throw (err)
      });      
    }
    else
    {
        let obj = "Logout"
        res.send(obj);
    } 
})

module.exports = router;