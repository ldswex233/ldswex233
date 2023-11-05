const mysql = require("mysql");
require("dotenv").config();

const { DB_PORT, DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const connection = mysql.createConnection({
    port: DB_PORT,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    timeout: 0,
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Connected to database`);

    setInterval(() => {
        connection.query(`SELECT * FROM uptime`, (error, results) => {});
    }, 1000 * 60 * 60 * 2)
});

module.exports = connection;
