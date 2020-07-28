const router = require('express').Router()
const userController = require('../../controllers/userController')

/*
  '/' Matches with "/api/users"
  GET "/api/users" - Gets all the users
  POST "/api/users" - Creates a new user | Example Request: { "vals": ["test_user", "111111", 1] } | Hashes PWS with Bcrypt
*/
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createNewUser)

/*
  '/:id' Matches with "/api/users/:id"
  GET "/api/users/:id" - get user data by ID
  PUT "/api/users/:id" -  update a user by ID | Example Request: { "vals": ["test_user", "111111", 1] } | Hashes new PW with Bcrypt
  DELETE "/api/users/:id" - delete a user by ID
*/
router
  .route('/:id')
  .get(userController.selectUserById)
  .put(userController.updateUserById)
  .delete(userController.deleteUserById)

module.exports = router
