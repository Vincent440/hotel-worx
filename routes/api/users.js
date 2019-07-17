const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/users"
router
  .route("/")
  // GET "/api/users"
  .get(userController.getAllUsers) //Gets all the users
  // POST "/api/users" Example Request: { "vals": ["test_user", "111111", 1] } Hashes PWS with Bcrypt
  .post(userController.createNewUser); // create a new user

// Matches with "/api/users/:id"
router
  .route("/:id")
  // GET "/api/users/:id"
  .get(userController.selectUserById) // get user data by ID
  // PUT "/api/users/:id" Example Request: { "vals": ["test_user", "111111", 1] } Hashes new PW with Bcrypt
  .put(userController.updateUserById) // update a user by ID
  // DELETE "/api/users/:id"
  .delete(userController.deleteUserById); // delete a user by ID

module.exports = router;
