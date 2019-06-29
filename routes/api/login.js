const router = require("express").Router();
const passport = require("passport");


// '/api/login' route
router.route("/")
// POST route for submitting login data
.post((req, res) => {
    console.log(req.body);
    res.status(200).json({
        user: true,
        body: req.body
    });
});

module.exports = router;