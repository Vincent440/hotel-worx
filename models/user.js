const connection = require("../config/connection");

const User = {
    selectAll: (cb) => {
        const queryString = "SELECT u.user_id, u.username, u.access_id, a.type FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id ORDER BY u.user_id ASC;";
        connection.query(queryString, (err, results) => {
            if (err) throw err;
            cb(results);
        });
    },
    selectOne: (id, cb) => {
        const queryString = "SELECT u.user_id, u.username, u.access_id, a.type FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id WHERE user_id=? LIMIT 1;";
        connection.execute(queryString, [id], (err, results, fields) => {
            if (err) throw err;
            cb(results);
        });
    },
    deleteOne: (id, cb) => {
        var queryString = "DELETE FROM users WHERE user_id=?;";
        connection.execute(queryString, [id], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: (table, cols, vals, cb) => {
        var queryString = "INSERT INTO " + table + " (" + cols.toString() + ") VALUES (" + printQuestionMarks(vals.length) + ")";
        connection.query(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: (table, setVal, condition, cb) => {
        var queryString = "UPDATE " + table + " SET " + setVal + " WHERE " + condition + ";";
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
}

module.exports = User;