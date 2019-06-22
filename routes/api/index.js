const router = require("express").Router();
const usersRoutes = require("./users");
const reserveRoutes = require("./reserve");
const testingRoutes = require("./testing");

// '/api/users' for all routes involving Users
router.use("/users", usersRoutes);

// '/api/reserve' for all routes involving Users
router.use("/reserve", reserveRoutes);

// '/api/testing' for any ongoing testing route builds
router.use("/testing",testingRoutes);

// '/api/test' for any ongoing testing route builds
router.get("/test", (req, res) => {
    res.status(200).send("sending this from the /api/test route");
});

module.exports = router;