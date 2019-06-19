const db = require("../models/index.js");

module.exports = {
    getAllUsers:(req, res)=> {
        db.User.selectAll((data) => {
            res.status(200).json(data);
        });
    },
    getUserById:(req, res)=> {
        db.User.selectOne(req.params.id, (data) => {
            res.status(200).json(data);
        });
    },
    deleteUserById:(req, res)=> {
        db.User.deleteOne(req.params.id, (data) => {
            res.status(200).json(data);
        });
    }
};
