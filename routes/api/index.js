const router = require("express").Router();
const usersRoutes = require("./users");
const reservationRoutes = require("./reservations");
const customersRoutes = require("./customers");
const roomRoutes = require("./rooms");
const hwRoutes = require("./hw");
const currentInfoRoutes = require("./current-info");
const loginRoute = require("./login");
const logoutRoute = require("./logout");
// login route for employees or managers
router.use("/login", loginRoute);

// logout route for employees or managers
router.use("/logout", logoutRoute);

// '/api/users' for all routes involving Users
router.use("/users", usersRoutes);

// '/api/customers' for all routes involving Users
router.use("/customers", customersRoutes);

// '/api/customers' for all routes involving Users
router.use("/current", currentInfoRoutes);

// '/api/reserve' for all routes involving Users
router.use("/reservations", reservationRoutes);

// '/api/rooms' for all routes involving Users
router.use("/rooms", roomRoutes);

// '/api/testing' for any ongoing testing route builds
router.use("/hw",hwRoutes);

// '/api' for any ongoing testing the root of /api route
router.get("/", (req, res) => {
  res.status(200).send("Succesful get to /api route");
});

module.exports = router;
