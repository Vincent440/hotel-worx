const router = require("express").Router();
const currentInfoController = require("../../controllers/currentInfoController");

// Matches with GET "api/current/arrivals"
router.get("/arrivals",currentInfoController.getCurrentDateArrivals);// Shows arrivals for todays date.


// Matches with GET "api/current/departures"
router.get("/departures",currentInfoController.getCurrentDateDepartures);// Shows departures for todays date.



module.exports = router;