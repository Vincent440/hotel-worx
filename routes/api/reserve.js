const router = require("express").Router();

// '/api/reserve'
router.route("/") 
.get((req, res) => {
    // '/api/reserve' GET DATA FOR MAKING A NEW RESERVATION
    res.status(200).send("<h3>Successful GET '/api/reserve' route</h3>");
});

// '/api/reserve/:id'
router.route("/:id")
.get((req, res) => {
    // '/api/reserve/:id' GET INFO FOR A RESERVATION ID
    res.status(200).send("<h3>Successful GET '/api/reserve/:id' route</h3>");
})
.put((req, res) => {
    // '/api/reserve/:id' PUT UPDATED INFO FOR A RESERVATION ID
    res.status(200).send("<h3>Successful PUT '/api/reserve/:id' route</h3>");
});

module.exports = router;