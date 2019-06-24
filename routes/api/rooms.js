const router = require("express").Router();
const roomController = require("../../controllers/roomController");

// Matches with '/api/rooms'
router.route("/")

// POST "/api/rooms" Example request:
// { "vals": ["208", 2, "microwave and courtyard view", 2, 1, 0, 1] }
.post(roomController.createNewRoom)
// GET "/api/rooms"
.get(roomController.getAllRooms);



// Matches with '/api/rooms/:id'
router.route("/:id")
// GET "api/rooms/:id"
.get(roomController.getRoomById)

// PUT "api/rooms/:id" Example Request:
// { "vals": ["208", 2, "microwave and courtyard view", 2, 1, 0, 1] }
.put(roomController.updateRoomById)
// DELETE "api/rooms/:id"
.delete(roomController.deleteRoomById);



module.exports = router;