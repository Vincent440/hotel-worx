const router = require("express").Router();
const customerController = require("../../controllers/customerController");

// Matches with "/api/customers"
router.route("/")
// POST "/api/customers" Example Request:
// { "vals": ["Joe", "Blow", "222 E Market St", "Akron", "Ohio", "42116", "joeblow@gmail.com", "440-234-1234", "n/a", 1] }
.post(customerController.createNewCustomer)
// GET "/api/customers"
.get(customerController.getAllCustomers);


// Matches with "/api/customers/:id"
router.route("/:id")
// GET "/api/customers/:id"
.get(customerController.getCustomerById)
// PUT "/api/customers/:id" Example Request:
// { "vals": ["Joe", "Blow", "222 E Market St", "Akron", "Ohio", "42116", "joeblow@gmail.com", "440-234-1234", "n/a", 1] }
.put(customerController.updateCustomerById)
// DELETE "/api/customers/:id"
.delete(customerController.deleteCustomerById);


module.exports = router;