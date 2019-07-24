const router = require("express").Router();
const reservationController = require("../../controllers/reservationController");

// Matches with '/api/reservations'
router.route("/")
// Post data in this format 
//  { 
//    "cust": ["first_name", "last_name", "address", "city", "state", "zip", "email", "phone", "credit_card_num", "cc_expiration", "active"],
//    "reserve": ["user_id", "comments"],
//    "rooms": [["room_type_id", "check_in_date", "check_out_date", "adults", "comments"]] 
//  }
// POST '/api/reservations'
// Example Data: { "cust": ["Peter", "Pan", "1111 FairyTale Lane", "Fantasyland", "Vermont", "23456", "p.pan@yahoo.net", "555-1212", "1234567890123456", "11-21", 1], 
// 	"reserve": [1, ""], 
// 	"rooms": [[2, "2019-08-12", "2019-08-15", 2,"119.99" , "need a good view"], [1, "2019-08-12", "2019-08-17", 2,"119.99", "want a late checkout"]] 
// }
.post(reservationController.createNewCustomerWithReservationAndRooms)
// GET '/api/reservations'
.get(reservationController.getAllReservations);


// Matches with '/api/reservations/:id'
router.route("/:id")
// GET'/api/reservations/:id'
.get(reservationController.getReservationById)


// Matches with PUT "/api/reservations/cancel/:id"
router.put("/cancel",reservationController.cancelReservationById);

// Matches With '/api/reservations/rooms/:id'
router.route("/rooms/:id")
// GET'/api/reservations/rooms/:id'
.get(reservationController.getRoomsConnectedToReservationById);


module.exports = router;