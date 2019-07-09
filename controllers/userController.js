const db = require("../models/index.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  createNewUser: (req, res) => {
    console.log(req.isAuthenticated());
    const userData = req.body.vals; // grab onto the new user array of values
    bcrypt.hash(userData[1], saltRounds, (err, hash) => {
      // use the index of the password value to pass to bcrypt
      // Store hash in your password DB.
      userData[1] = hash; //replace plain text password with hash
      console.log(userData);
      db.User.insertOne(userData, result => {
        // save new user with hashed password to database
        res.status(200).json({ id: result.insertId });
      });
    });
  },
  getAllUsers: (req, res) => {
    console.log(req.isAuthenticated());
    db.User.selectAll(data => {
      res.status(200).json(data);
    });
  },
  getUserById: (req, res) => {
    console.log(req.isAuthenticated());
    db.User.selectOneById(req.params.id, data => {
      res.status(200).json(data);
    });
  },
  updateUserById: (req, res) => {
    console.log(req.isAuthenticated());
    const userData = req.body.vals; // grab onto the new user array of values

    bcrypt.hash(userData[1], saltRounds, (err, hash) => {
      // use the index of the password value to pass to bcrypt
      userData[1] = hash; //replace plain text password with hash
      console.log(userData);
      db.User.updateOne(userData, req.params.id, result => {
        if (result.changedRows === 0) {
          res.status(204).end();
        } else {
          res.status(200).end();
        }
      });
    });
  },
  deleteUserById: (req, res) => {
    console.log(req.isAuthenticated());
    db.User.deleteOne(req.params.id, data => {
      res.status(200).json(data);
    });
  }
};
