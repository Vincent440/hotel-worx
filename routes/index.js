const router = require("express").Router();
const apiRoutes = require("./api");
const loginRoute = require("./login");
const path = require("path");
// API Routes any route starting with / api
router.use("/api", apiRoutes);

router.use("/login", loginRoute);

// =========================================================================
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;