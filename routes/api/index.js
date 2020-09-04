const router = require('express').Router()
const usersRoutes = require('./users')
const reservationRoutes = require('./reservations')
const customersRoutes = require('./customers')
const roomRoutes = require('./rooms')
const hwRoutes = require('./hw')
const currentInfoRoutes = require('./current-info')
const loginRoute = require('./login')
const logoutRoute = require('./logout')
const roomTypesRoutes = require('./room-types')

// login route for employees or managers
router.use('/login', loginRoute)

// logout route for employees or managers
router.use('/logout', logoutRoute)

// '/api/users' for all routes involving Users
router.use('/users', usersRoutes)

// '/api/customers' for all routes involving Users
router.use('/customers', customersRoutes)

// '/api/customers' for all routes involving Users
router.use('/current', currentInfoRoutes)

// '/api/reserve' for all routes involving Users
router.use('/reservations', reservationRoutes)

// '/api/rooms' for all routes involving Users
router.use('/rooms', roomRoutes)

// '/api/rooms/types' for all routes involving the Room types
router.use('/room/types', roomTypesRoutes)

// '/api/hw' for any ongoing hotel worx functionality
router.use('/hw', hwRoutes)

module.exports = router
