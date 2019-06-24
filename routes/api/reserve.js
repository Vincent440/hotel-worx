const router = require("express").Router();
const reserveController = require("../../controllers/reserveController");

// Matches with '/api/reserve'
router.route("/")
// GET '/api/reserve'
.get(reserveController.getAllReservations);


// Matches with '/api/reserve/:id'
router.route("/:id")
// GET'/api/reserve/:id'
.get(reserveController.getReservationById)
// PUT'/api/reserve/:id'
.put(reserveController.updateReservationById);



module.exports = router;