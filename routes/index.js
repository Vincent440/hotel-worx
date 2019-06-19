const router = require("express").Router();
const testRoutes = require("./mike_test_routes");
const test2Routes = require("./mike_test_routes2");

router.use("/", testRoutes);
router.use("/", test2Routes);

module.exports = router;