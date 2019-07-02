const router = require("express").Router();
const passport = require("passport");
require("../../controllers/passportController")(passport);
// const db = require("../../models");

// '/api/login' route

router.route("/").post(// Using local strategy to redirect back to the signin page if there is an error
    passport.authenticate('local', { failureRedirect : '/login' }),
    function(req, res) {
        debugger;
        console.log(req.isAuthenticated());
        console.log("line 11 routes/api/login.js route callback function | Request: "+ req);
        // if (req.body.remember) {
        //   req.session.cookie.maxAge = 1000 * 60 * 3;
        // } else {
        //  req.session.cookie.expires = false;
        // }
        res.status(200).json({ user: req.user } );
});

// POST route for submitting login data
// .post((req,res)=>{
//     res.status(200).json({user: true,body: req.body})
// });

module.exports = router;