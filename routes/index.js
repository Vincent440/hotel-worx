const express = require("express");
const router = express.Router();

const db = require("../models/index.js");

router.get("/api/users", (req, res) => {
    db.User.selectAll((data) => {
        res.json(data);
    });
});

router.get("/api/test", (req, res) => {
    res.send("sending this from the /api/test route");
});

module.exports = router;