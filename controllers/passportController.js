const userPassport = require("../models/userPassport.js");

const LocalStrategy   = require('passport-local').Strategy;

module.exports = function(passport){
    //  ===================================== passport session setup ========================================
    // required for persistent login sessions passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        debugger;
        console.log("in passportController.js line: 11 SerializeUser func user: "+ user);
        done(null, user.user_id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        debugger;
        console.log("in passportController.js line: 17 DeserializeUser func before userPassport call");
        userPassport.getUserById(id, (err,data) => {
            debugger;
            console.log("in passportController.js line: 19 DeserializeUser func after userPassport call");
            console.log(data[0]);
            done(err,data[0]);
        });
    });
    //  ===================  LOCAL Strategy  ============================
    passport.use(new LocalStrategy(function( username, password, done) {
        debugger;
        console.log(username);
        console.log(password);
        console.log(" passportController.js In local strategy use func: line 23");
            // callback with username and password from our form
            userPassport.getUserByUsernameWithPassword(username,function(err, user){
                if (err){
                    console.log("Error in passportController.js line 29"+err);
                    return done(err);
                }
                user = user[0];              
                debugger;
                console.log("In passportController.js line 32 Pass error conditional"+err +"\n user data: "+ user);
                // else if (!rows.length) {
                //     return done(null, false);
                // }
                // OLD BECRYPT CODE
                // if the user is found but the password is wrong
                // else if (!bcrypt.compareSync(password, rows[0].password)) {
                //     return done(null, false); 
                // }
                console.log(user);

                console.log(password);
                console.log(user.password);
               
                if (password === user.password){
                    // all is well, return successful user
                    delete user.password;
                    return done(null, user);
                }
                else    {
                    // all is well, return successful user
                    return done(null, false);
                }
            });
        }
    ));
};