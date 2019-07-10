const router = require("express").Router();
const roomTypeController = require("../../controllers/roomTypeController");

// Matches with "api/rooms/types"
router.route("/")
// POST "api/rooms/types" Example Request: { "vals": ["2Double", 109.99] }
.post(roomTypeController.createNewRoomType)
// GET "api/rooms/types"
.get(roomTypeController.getAllRoomTypes);


// Matches with "api/rooms/types/:id"
router.route("/:id")
// GET "api/rooms/types/:id"
.get(roomTypeController.getRoomTypeById)
// PUT "api/rooms/types/:id" Example Request: { "vals": ["2Double", 109.99] }
.put(roomTypeController.updateRoomTypeById)
// Delete "api/rooms/types/:id"
.delete(roomTypeController.deleteRoomTypeById);


module.exports = router;