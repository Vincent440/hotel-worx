const router = require("express").Router();
// '/api/testing' route
router.route("/").get( (req, res) => {
    res.status(200).send("sending this from the /api/testing route for any test routes");
});


module.exports = router;