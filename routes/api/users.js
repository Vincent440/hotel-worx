const router = require("express").Router();
const db = require("../../models/index.js");

// Matches with "/api/users"
router.route("/").get((req, res) => {
    db.User.selectAll((data) => {
        res.json(data);
    });
});


// Matches with "/api/users:id"
router.route("/:id").get((req, res) => {
    db.User.selectOne(req.params.id, (data) => {
        res.json(data);
    });
});

module.exports = router;
