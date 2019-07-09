const router = require("express").Router();
const passport = require("passport");
require("../../controllers/passportController")(passport);

// '/api/login' route Using local strategy to redirect back to the signin page if there is an error

router.route("/").post( passport.authenticate("local"),(req, res) => {
    console.log("req.session: " + req.session);
    console.log("req.sessionID: " + req.sessionID);
    res.status(200).json({ user: req.user, loggedIn: req.isAuthenticated() });
  }
);

// '/api/login/status' route
router.route("/status").get((req, res) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user, loggedIn: req.isAuthenticated() });
  } else {
    res.status(200).json({ user: {}, loggedIn: req.isAuthenticated() });
  }
});

module.exports = router;