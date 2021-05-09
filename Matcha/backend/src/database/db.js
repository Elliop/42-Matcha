const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tiger",
    database: "Matcha"
});

module.exports = con;