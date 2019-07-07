const userPassport = require("../models/userPassport.js");
const bcrypt = require("bcrypt");
const LocalStrategy   = require('passport-local').Strategy;

module.exports = function(passport) {
    //  ======================== Passport Session Setup ============================
    // required for persistent login sessions passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.user_id);
    });
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        userPassport.getUserById(id, (err,data) => {
            done(err,data);
        });
    });
    //  ===================  LOCAL Strategy  ============================
    passport.use(new LocalStrategy(function( username, password, done) {
        // callback with username and password from client
        userPassport.getUserByUsernameWithPassword(username,function(err, user){
            if (err){
                return done(err);// if err return err
            }   else {
                console.log("In local Strategy & Found user from database comparing password..");
                //if user found, compare password against db password and return true or false if it matches
                console.log(user);
                bcrypt.compare(password,user.password,(err,result)=>{
                    if (result) {
                        console.log("Successful passport-local Strategy log in");
                        delete user.password;
                        done(null,user);
                    }   else {
                        done(err,false);
                    }
                });
            }
        });
    }));
};