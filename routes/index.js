const router = require("express").Router();
const apiRoutes = require("./api");
const loginRoute = require("./login");
// API Routes any route starting with / api
router.use("/api", apiRoutes);

router.use("/login", loginRoute);

// =========================================================================

module.exports = router;