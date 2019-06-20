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
        const queryString = "DELETE FROM users WHERE user_id=?;";
        connection.execute(queryString, [id], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: (username, password, access_id, cb) => {
        console.log(vals);
        const queryString = "INSERT INTO users (username, password, access_id) VALUES (?,?,?)";
        connection.execute(queryString, [username, password, access_id], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: (username, password, access_id, id, cb) => {
        const queryString = "UPDATE users SET username=?, password=?, access_id=? WHERE user_id=?;";
        connection.execute(queryString, [username, password, access_id, id], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
}

module.exports = User;