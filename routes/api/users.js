const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router.route("/").get(usersController.getAllUsers);

// Matches with "/api/users:id"
router.route("/:id")
.get(usersController.getUserById)//get user data by id
.delete(usersController.deleteUserById);//delete a user by id

module.exports = router;
