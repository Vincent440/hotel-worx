const router = require('express').Router()
const roomController = require('../../controllers/roomController')

/*
  POST
  Example request:
  {
    "vals": ["208", 2, "microwave and courtyard view", 2, 1, 0, 1]
  }
  GET "/api/rooms"
*/
router.route('/')
  .post(roomController.createNewRoom)
  .get(roomController.getAllRooms)

/*
  GET '/api/rooms/:id'
  PUT '/api/rooms/:id'
  Example Request:
  {
    "vals": ["208", 2, "microwave and courtyard view", 2, 1, 0, 1]
  }
  DELETE '/api/rooms/:id'
*/
router.route('/:id')
  .get(roomController.getRoomById)
  .put(roomController.updateRoomById)
  .delete(roomController.deleteRoomById)

module.exports = router
