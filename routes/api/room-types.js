const router = require('express').Router()
const roomTypeController = require('../../controllers/roomTypeController')

/*
  INACTIVE - POST
  POST "api/room/types" Example Request: { "vals": ["2Double", 109.99] }
  GET "api/room/types"
*/

router.route('/').get(roomTypeController.getAllRoomTypes)
// .post(roomTypeController.createNewRoomType)

/*
  INACTIVE - ALL
  GET "api/room/types/:id"
  PUT "api/room/types/:id" Example Request: { "vals": ["2Double", 109.99] }
  DELETE "api/room/types/:id"
*/

// router
//   .route('/:id')
//   .get(roomTypeController.getRoomTypeById)
//   .put(roomTypeController.updateRoomTypeById)
//   .delete(roomTypeController.deleteRoomTypeById)

/*
  GET "api/room/types/available/:date"
*/
router.get('/available/:date', roomTypeController.getAvailableRoomsByDate)

module.exports = router
