const express = require("express");
const passport = require("passport");
const app = express();
const bodyParser = require('body-parser');
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
require('./controllers/passportController')(passport); // pass passport for configuration

app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboardingkittencat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
app.use(routes);

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}.`);
});