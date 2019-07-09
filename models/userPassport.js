const connection = require("../config/connection");

const UserPassport = {

    getUserByUsernameWithPassword: (username, done) => {
        const queryString = "SELECT u.user_id, u.username,u.password, u.access_id, a.type FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id WHERE username=? LIMIT 1;";
        connection.execute(queryString, [username], (err, user) => {
            if (err) {
                return done(err,user);
            }
            return done(null,user[0]);
        });
    },
    getUserById: (id, done) => {
        const queryString = "SELECT u.user_id, u.username, u.access_id, a.type FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id WHERE user_id=? LIMIT 1;";
        connection.execute(queryString, [id], (err, user) => {
            if (err) {
                return done(err,user);
            }
            return done(null,user[0]);
        });
    }
}

module.exports = UserPassport;

