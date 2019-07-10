const router = require("express").Router();
const roomController = require("../../controllers/roomController");
const roomTypesRoutes = require("./room-types");

// Matches with '/api/rooms'
router.route("/")
// POST Example request: { "vals": ["208", 2, "microwave and courtyard view", 2, 1, 0, 1] }
.post(roomController.createNewRoom)
// GET "/api/rooms"
.get(roomController.getAllRooms);


// Matches with '/api/rooms/:id'
router.route("/:id")
// GET
.get(roomController.getRoomById)
// PUT Example Request:{ "vals": ["208", 2, "microwave and courtyard view", 2, 1, 0, 1] }
.put(roomController.updateRoomById)
// DELETE
.delete(roomController.deleteRoomById);

// '/api/rooms/types' for all routes involving the Room types
router.use("/types", roomTypesRoutes);


module.exports = router;