const router = require('express').Router()
const customerController = require('../../controllers/customerController')

/*
  "/api/customers"
  POST "/api/customers"
  |
    Example Request:
    { "vals": ["Joe", "Blow", "222 E Market St", "Akron", "Ohio", "42116", "joeblow@gmail.com", "440-234-1234", "n/a", 1] } 
  |
  GET "/api/customers"
*/
router
  .route('/')
  .post(customerController.createNewCustomer)
  .get(customerController.getAllCustomers)

/*
  "/api/customers/:id"
  GET "/api/customers/:id"
  PUT "/api/customers/:id"
  |
    Example Request:
    { "vals": ["Joe", "Blow", "222 E Market St", "Akron", "Ohio", "42116", "joeblow@gmail.com", "440-234-1234", "n/a", 1] }
  |
  DELETE "/api/customers/:id"
*/
router
  .route('/:id')
  .get(customerController.getCustomerById)
  .put(customerController.updateCustomerById)
  .delete(customerController.deleteCustomerById)

module.exports = router
