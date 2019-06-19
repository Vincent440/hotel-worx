const express = require("express");
const router = express.Router();

const db = require("../models/index.js");

router.get("/api/users", (req, res) => {
    db.User.selectAll((data) => {
        res.json(data);
    });
});

router.get("/api/users/:id", (req, res) => {
    db.User.selectOne(req.params.id, (data) => {
        res.json(data);
    });
});

module.exports = router;