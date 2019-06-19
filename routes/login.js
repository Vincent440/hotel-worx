const router = require("express").Router();

// '/login' route
router.route("/")
//post route for submitting login data and redirecting to either successful login dashboard or sending error message
.post((req, res) => {
    res.status(200).json({
        user: true,
        body:req.body
    });
});


module.exports = router;