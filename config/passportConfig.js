const userPassport = require("../models/userPassport.js");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });
  passport.deserializeUser((id, done) => {
    userPassport.getUserById(id, (err, data) => {
      done(err, data);
    });
  });
  passport.use(
    new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
      if (!req.user && (!username === "" || password.length >= 5)) {
        userPassport.getUserByUsernameWithPassword(username, (err, user) => {
          if (err) {
            return done(err); // if err return err
          } else if (!user) {
            return done(null, false,{ message:`No username found that matches ${username}`});
          } else {
            bcrypt.compare(password, user.password, (err, result) => {
              if(err) {
                done(err);
              }
              else if (result) {
                delete user.password;
                done(null, user);
              }
              else {
                done(null, false, { message:'incorrect password'});
              }
            });
          }
        });
      } else if (req.user) {
        done(null, req.user);
      } else {
        return done(null, false,{ message:'Username and password must match input requirements'});
      }
    })
  );
};