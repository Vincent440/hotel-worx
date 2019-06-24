const router = require("express").Router();
const reservationController = require("../../controllers/reservationController");

// Matches with '/api/reservations'
router.route("/")
// GET '/api/reservations'
.get(reservationController.getAllReservations);


// Matches with '/api/reservations/:id'
router.route("/:id")
// GET'/api/reservations/:id'
.get(reservationController.getReservationById)


// Matches with PUT "/api/reservations/cancel/:id"
router.put("/cancel",reservationController.cancelReservationById);


// Matches With '/api/reservations/new'
router.route("/new")
// POST "/api/reservations/new" Example Request: 
// { "cust": ["Peter", "Pan", "1111 FairyTale Lane", "Fantasyland", "Vermont", "23456", "p.pan@yahoo.net", "555-1212", "n/a", 1], "reserve": [1], "rooms": [[2, "2019-08-12", "2019-08-15", 2], [2, "2019-08-12", "2019-08-19", 3], [2, "2019-08-12", "2019-08-17", 1]] }
.post(reservationController.createNewCustomerWithReservationAndRooms);


// Matches With '/api/reservations/rooms/:id'
router.route("/rooms/:id")
// GET'/api/reservations/rooms/:id'
.get(reservationController.getReservationRoomsById);



module.exports = router;