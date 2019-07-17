const router = require("express").Router();
const roomTypeController = require("../../controllers/roomTypeController");

// Matches with "api/room/types"
router.route("/")
// POST "api/room/types" Example Request: { "vals": ["2Double", 109.99] }
.post(roomTypeController.createNewRoomType)
// GET "api/room/types"
.get(roomTypeController.getAllRoomTypes);


// Matches with "api/room/types/:id"
router.route("/:id")
// GET "api/room/types/:id"
.get(roomTypeController.getRoomTypeById)
// PUT "api/room/types/:id" Example Request: { "vals": ["2Double", 109.99] }
.put(roomTypeController.updateRoomTypeById)
// Delete "api/room/types/:id"
.delete(roomTypeController.deleteRoomTypeById);


module.exports = router;