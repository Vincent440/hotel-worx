const router = require("express").Router();
const usersRoutes = require("./users");
const testingRoutes = require("./testing");

// '/api/users' for all routes involving Users
router.use("/users", usersRoutes);

// '/api/testing' for any ongoing testing route builds
router.use("/testing",testingRoutes);

router.get("/test", (req, res) => {
    res.status(200).send("sending this from the /api/test route");
});

module.exports = router;