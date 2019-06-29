const userPassport = require("../models/userPassport.js");

const LocalStrategy   = require('passport-local').Strategy;

module.exports = function(passport){

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });


    
    passport.deserializeUser(function(id, done) {
        userPassport.getUserById(id, (err,data) => {
            done(err,data);
        });
    });
    
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login',
        new LocalStrategy(function(req, username, password, done) { 
            
            // callback with email and password from our form
            userPassport.getUserByUsernameWithPassword(username),function(err, rows){
                if (err){
                    return done(err);
                }
                // else if (!rows.length) {
                //     return done(null, false);
                // }
                // OLD BECRYPT CODE
                // if the user is found but the password is wrong
                // else if (!bcrypt.compareSync(password, rows[0].password)) {
                //     return done(null, false); 
                // }
               
                // all is well, return successful user
                return done(null, rows[0]);
                
            }
            
        }
    ));
};