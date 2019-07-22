const router = require("express").Router();

// Matches with "api/logout"
router.route("/").get((req, res) => {
  req.session.destroy(err => {
    if(err) {
      console.log(err);
    }
    res.status(200).json({
    user: {
      access_id: 0,
      type: "Guest",
      user_id: 0,
      username: "guest"
    }});
  });
  req.logout();
  console.log("User logged out")
});

module.exports = router;