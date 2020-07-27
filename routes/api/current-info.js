const router = require('express').Router()
const currentInfoController = require('../../controllers/currentInfoController')

// GET "api/current/arrivals" - Shows arrivals for todays date.
router.get('/arrivals', currentInfoController.getCurrentDateArrivals)

// GET "api/current/departures" - Shows departures for todays date.
router.get('/departures', currentInfoController.getCurrentDateDepartures)

module.exports = router
