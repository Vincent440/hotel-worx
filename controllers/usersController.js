const db = require("../models/index.js");

module.exports = {
    findAll: function(req, res) {
        db.User.selectAll((data) => {
            res.json(data);
        });
    },
    findUserById: function(req, res) {
        db.User.selectOne(req.params.id, (data) => {
            res.json(data);
        });
    }
};
