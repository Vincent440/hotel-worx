const connection = require("../config/connection");

const UserPassport = {

    //set up for passport to interact with mysql db

    //get all data of a user for WORKS
    getUserById: (id, done) => {
        const queryString = "SELECT u.user_id, u.username, u.access_id, a.type FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id WHERE user_id=? LIMIT 1;";
        connection.execute(queryString, [id], (err, user) => {
            done(err,user);
        });
    },
    getUserByUsername: (username, done) => {
        const queryString = "SELECT u.user_id, u.username, u.access_id, a.type FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id WHERE username=? LIMIT 1;";
        connection.execute(queryString, [username], (err, user) => {
            done(err,user);
        });
    },
    getUserByUsernameWithPassword: (username,password, done) => {
        const queryString = "SELECT u.user_id, u.username, u.access_id, a.type FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id WHERE username=? AND password =? LIMIT 1;";
        connection.execute(queryString, [username,password], (err, user) => {
            done(err,user);
        });
    }

}

module.exports = UserPassport;