const db = require("../models/index.js");

module.exports = {
    getAllUsers:(req, res)=> {
        db.User.selectAll((data) => {
            res.json(data);
        });
    },
    getUserById:(req, res)=> {
        db.User.selectOne(req.params.id, (data) => {
            res.json(data);
        });
    },
    deleteUserById:(req, res)=> {
        db.User.deleteOne(req.params.id, (data) => {
            res.json(data);
        });
    }
};
