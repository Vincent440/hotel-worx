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
    insertOne: (vals, cb) => {
        console.log(vals);
        var queryString = "INSERT INTO users (username, password, access_id) VALUES (?,?,?)";
        connection.execute(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: (id, vals, cb) => {
        var queryString = "UPDATE users SET " + setVal + " WHERE " + condition + ";";
        connection.execute(queryString, [id, vals], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
}

module.exports = User;