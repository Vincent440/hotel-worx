const router = require("express").Router();

// '/api/reserve'
router.route("/") 
.get((req, res) => {
    res.status(200).send("<h3>Successful GET '/api/reserve' route</h3>");
});

// '/api/reserve/:id'
router.route("/:id")
.get((req, res) => {
    res.status(200).send("<h3>Successful GET '/api/reserve/view/<reservation id here>' route</h3>");
})  
// '/api/reserve/update/:id'
.post((req, res) => {
    res.status(200).send("<h3>Successful POST '/api/reserve/update/:id' route</h3>");
});

module.exports = router;