"use strict";
const express = require("express");
const passport = require("passport");
require('./controllers/passportController')(passport);// pass passport for configuration
const flash = require('connect-flash');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const routes = require("./routes");
const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
app.use(cookieParser('hotelworxmernapplication'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'hotelworxmernapplication', resave: false, saveUninitialized: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
app.listen(PORT, () => console.log(`React API server listening on PORT ${PORT}.`));