'use strict'
require('dotenv').config()
const express = require('express')
const passport = require('passport')
require('./config/passportConfig')(passport) // pass passport for configuration
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
const routes = require('./routes')
const sessionStore = require('./config/promiseConnection')
const PORT = process.env.PORT
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
  secret: 'hotelworxmernapplication',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000, // 3600000 1 hour in milliseconds. The expiration time of the cookie to set it as a persistent cookie.
    sameSite: true
  }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(routes)
app.listen(PORT, () => console.log(`React API server listening on PORT ${PORT}.`))
