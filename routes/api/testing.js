const router = require("express").Router();
// '/api/testing' route
router.route("/").get( (req, res) => {
    res.send("sending this from the /api/testing route for any test routes");
});


module.exports = router;