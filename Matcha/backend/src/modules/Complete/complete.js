const con = require("../../database/db");
const express = require("express");
const router = express.Router();

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const checktmp = async (req) => new Promise(async (res, rej) => {
  const { tmp } = req.body;
  let sql = "SELECT * FROM User WHERE tmp = ?";
  con.query(sql, [tmp], function (err, result) {
    if (result.length != 0) {
      let tab = "True"
      res(tab);
    }
    else {
      let tab = "False"
      res(tab);
    }
  });
})

router.post("/complete", async (req, res) => {
  const { gender, sexualPref, bio, tags, date, tmp } = req.body;
  let checked = await checktmp(req);
  if (checked == "True") {
    let sql = "SELECT id FROM User WHERE tmp = ?";
    con.query(sql, [tmp], function (err, result) {
      const id = result[0].id;
      sql = "SELECT * FROM Info WHERE user_id = ?";
      con.query(sql, [id], function (err, result) {
        if (result.length == 0) {
          let sql = "INSERT INTO Info (user_id, gender, sexualPref, bio, date) VALUES (?, ?, ?, ?, ?)";
          con.query(sql, [id, gender, sexualPref, bio, date], function (err, result) {
            tags.forEach(element => {
              sql = "INSERT INTO Tags (user_id, tag) VALUES (?, ?)";
              con.query(sql, [id, element], function (err, result) {
                sql = "UPDATE User SET completed = 1 WHERE tmp = ?";
                con.query(sql, [tmp], function (err, result) {
                });
              });
            });
          });
          let image1 = "http://localhost:6937/2020-02-08T13:53:45.985ZMatcha1.jpeg";
          let image2 = "http://localhost:6937/2020-02-08T13:56:44.007ZMatcha2.jpg";
          let image3 = "http://localhost:6937/2020-02-08T13:53:45.985ZMatcha3.jpeg";
          let image4 = "http://localhost:6937/2020-02-08T13:53:45.985ZMatcha4.jpeg";
          sql = "INSERT INTO Images (user_id, image_id, image) VALUES (?, ?, ?)";
          con.query(sql, [id, 1, image1], function (err, result) {
           });
          sql = "INSERT INTO Images (user_id, image_id, image) VALUES (?, ?, ?)";
          con.query(sql, [id, 2, image2], function (err, result) { });
          sql = "INSERT INTO Images (user_id, image_id, image) VALUES (?, ?, ?)";
          con.query(sql, [id, 3, image3], function (err, result) { });
          sql = "INSERT INTO Images (user_id, image_id, image) VALUES (?, ?, ?)";
          con.query(sql, [id, 4, image4], function (err, result) { });
          sql = "INSERT INTO Rating (user_id, score, fameRating) VALUES (?, ?, ?)";
          con.query(sql, [id, 1, 1], function (err, result) { });
          let brt = String(date)
          let age = getAge(brt)
          sql = "UPDATE User SET age = ? WHERE id = ?";
          con.query(sql, [age, id], function (err, result) {
            if (err) throw (err)
          });
          sql = "INSERT INTO NumNotif (user_id, num) VALUES (?, ?)";
          con.query(sql, [id, 0], function (err, result) {
            if (err) throw (err)
          });
        }
      });
    });
  }
  else {
    let obj = "Logout"
    res.send(obj);
  }
});

module.exports = router;
