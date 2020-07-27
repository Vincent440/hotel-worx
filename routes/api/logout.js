const router = require('express').Router()

// "api/logout"
router.route('/').get((req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err)
    }
    res.status(200).json({
      user: {
        access_id: 0,
        type: 'Guest',
        user_id: 0,
        username: 'guest'
      }
    })
  })
  req.logout()
  // console.log('User logged out')
})

module.exports = router
