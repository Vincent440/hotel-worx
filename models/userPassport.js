const connection = require("../config/connection");

const UserPassport = {

    //set up for passport to interact with mysql db

    //get all data of a user for WORKS
    getUserById: (id, done) => {
        debugger;
        console.log("user passport get user by id");
        const queryString = "SELECT u.user_id, u.username, u.access_id, a.type FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id WHERE user_id=? LIMIT 1;";
        connection.execute(queryString, [id], (err, user) => {
            if (err) {
                return done(err,user);
            }
            console.log(user[0]);
            return done(null,user);
        });
    },
    getUserByUsername: (username, done) => {
        console.log("user passport get by username");
        const queryString = "SELECT u.user_id, u.username, u.access_id, a.type FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id WHERE username=? LIMIT 1;";
        connection.execute(queryString, [username], (err, user) => {
            if (err) {
                return done(err,user);
            }
            console.log(user[0]);
            return done(null,user);
        });
    },
    getUserByUsernameWithPassword: (username, done) => {
        console.log("user passport get by username and password");
        const queryString = "SELECT u.user_id, u.username,u.password, u.access_id, a.type FROM users AS u INNER JOIN access_levels AS a ON u.access_id=a.access_id WHERE username=? LIMIT 1;";
        connection.execute(queryString, [username], (err, user) => {
            if (err) {
                return done(err,user);
            }
            console.log(user[0]);
            return done(null,user);
        });
    }

}

module.exports = UserPassport;