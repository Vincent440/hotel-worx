const router = require("express").Router();
const passport = require("passport");
require("../../controllers/passportController")(passport);

// Matches with "api/logout"
router.route("/").get((req, res) => {
  req.logout();
  res.status(200).json({ user: {}, loggedIn: req.isAuthenticated() });
});

module.exports = router;