const router = require('express').Router()
const reservationController = require('../../controllers/reservationController')
/*
Data Format
{
  "cust": ["first_name", "last_name", "address", "city", "state", "zip", "email", "phone", "credit_card_num", "cc_expiration", "active"],
  "reserve": ["user_id", "comments"],
  "rooms": [["room_type_id", "check_in_date", "check_out_date", "adults", "comments"]]
 }
POST '/api/reservations'
  Example Data:
  {
    "cust": ["Peter", "Pan", "1111 FairyTale Lane", "Fantasyland", "Vermont", "23456", "p.pan@yahoo.net", "555-1212", "1234567890123456", "11-21", 1],
    "reserve": [1, ""],
    "rooms": [[2, "2019-08-12", "2019-08-15", 2,"119.99" , "need a good view"], [1, "2019-08-12", "2019-08-17", 2,"119.99", "want a late checkout"]]
  }
 GET '/api/reservations'
*/
router
  .route('/')
  .post(reservationController.createNewCustomerWithReservationAndRooms)
  .get(reservationController.getAllReservations)

// GET'/api/reservations/:id'
router.get('/:id', reservationController.getReservationById)

// PUT "/api/reservations/cancel/:id"
router.put('/cancel/:id', reservationController.cancelReservationById)

// GET'/api/reservations/rooms/:id'
router.get(
  '/rooms/:id',
  reservationController.getRoomsConnectedToReservationById
)

module.exports = router
