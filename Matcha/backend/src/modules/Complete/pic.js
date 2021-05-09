const con = require("../../database/db");
const express = require("express");
const multer = require("multer");
const router = express.Router();
const Jimp = require("jimp");
const fs = require("file-system");

const checktmp = async req =>
  new Promise(async (res, rej) => {
    const { tmp } = req.body;
    let sql = "SELECT * FROM User WHERE tmp = ?";
    con.query(sql, [tmp], function(err, result) {
      if (result.length != 0) {
        let tab = "True";
        res(tab);
      } else {
        let tab = "False";
        res(tab);
      }
    });
  });

const checkFileType = (file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
    cb(null, true);
  else cb(null, false);
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});

router.post("/pic", upload.single("file"), async (req, res) => {
  const tmp = req.body.tmp;
  let checked = await checktmp(req);
  if ((checked = "True")) {
    const pic = `http://localhost:6937/${req.file.filename}`;
    if (typeof req.file !== "undefined") {
      new Jimp(req.file.path, async (err, image) => {
        if (err) {
          if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
          res.send({ msg: "Image not valid" });
        } else {
          if (req.file.filename.size === 0)
            res.send({ msg: "Image not valid" });
          else {
            let sql = "UPDATE User SET pic = ? WHERE tmp = ?";
            con.query(sql, [pic, tmp], function(err, result) {
              if (err) throw err;
              res.send(pic);
            });
          }
        }
      });
    }
  } else {
    let obj = "Logout";
    res.send(obj);
  }
});

module.exports = router;
