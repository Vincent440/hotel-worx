const router = require("express").Router();
const passport = require("passport");
require("../../controllers/passportController")(passport);

// const db = require("../../models");

// // route middleware to make sure
// function isLoggedIn(req, res, next) {

// 	// if user is authenticated in the session, carry on
// 	if (req.isAuthenticated())
// 		return next();

// 	// if they aren't redirect them to the home page
// 	res.redirect(req.session.returnTo || '/');
// }    console.log(req.body);


// passport.initialize("local"),(req, res) => {


// }
// '/api/login' route
router.route("/")
// POST route for submitting login data
.post((req,res)=>{
    res.status(200).json({user: true,body: req.body})
});

module.exports = router;