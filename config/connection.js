const mysql = require("mysql2");
let connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    const pwd = require("./pwd.js");
    connection = mysql.createConnection({
        database: "hotel_worx_db",
        host: "localhost",
        port: 3306,
        user: "root",
        password: pwd
    });
}

connection.connect();
module.exports = connection;