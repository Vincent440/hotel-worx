const userPassport = require("../models/userPassport.js");
// const db = require("../models");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
module.exports = passport => {
  //  ======================== Passport Session Setup ============================
  // required for persistent login sessions passport needs ability to serialize and unserialize users out of session
  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });
  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    userPassport.getUserById(id, (err, data) => {
      done(err, data);
    });
  });
  passport.use(
    new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
      console.log(`Pass port use local-strategy sign in attempt for: ${username}`);
      if (!req.user && (!username === "" || password.length >= 5)) {
        // callback with username and password from client must match basic requirements before even being compared in DB

        console.log("attempting to get user from DB");
        userPassport.getUserByUsernameWithPassword(username, (err, user) => {
          if (err) {
            console.log("Error occured getting user from DB to compare against Posted user INFO");
            return done(err); // if err return err
          } else if (!user) {
            console.log(`No user found Returning from local-strategy login failed to login ${username}`);
            return done(null, false);
          } else {
            console.log(`In local Strategy & Found ${username} from database comparing password..`);
            //if user found, compare password against db password and return true or false if it matches
            console.log(user);
            bcrypt.compare(password, user.password, (err, result) => {
              if (result) {
                console.log(`Successful login for User: ${user.username} ID: ${user.user_id} Type:${user.type} type-ID:${user.access_id} removing pw from userObj and attaching to future requests`);
                delete user.password;
                done(null, user);
              } else {
                done(err, false);
              }
            });
          }
        });
      } else if (req.user) {
        done(null, req.user);
      } else {
        return done(null, false);
      }
    })
  );
};