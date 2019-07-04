const router = require("express").Router();
const passport = require("passport");
require("../../controllers/passportController")(passport);

// '/api/login' route
router.route("/").post(// Using local strategy to redirect back to the signin page if there is an error
    passport.authenticate('local', { failureRedirect : '/login' }),
    function(req, res) {
        res.status(200).json({ user: req.user, isLoggedIn: req.isAuthenticated() });
});

module.exports = router;