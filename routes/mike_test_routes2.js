const express = require("express");
const router = express.Router();

router.get("/api/test", (req, res) => {
    res.send("sending this from the /api/test route");
});

module.exports = router;