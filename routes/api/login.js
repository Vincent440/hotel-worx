const router = require('express').Router()
const passport = require('passport')

// '/api/login' route Using local strategy to redirect back to the signin page if there is an error
router.route('/').post(passport.authenticate('local'), (req, res) => {
  // console.log(req.user)
  res.status(200).json({ user: req.user })
})

// '/api/login/status' route
router.route('/status').get((req, res) => {
  // console.log(req.isAuthenticated())
  if (req.isAuthenticated()) {
    // console.log(req.isAuthenticated())
    res.status(200).json({ user: req.user })
  } else {
    res.status(200).json({
      user: {
        access_id: 0,
        type: 'Guest',
        user_id: 0,
        username: 'guest'
      }
    })
  }
})

module.exports = router
