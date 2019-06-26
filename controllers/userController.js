const db = require("../models/index.js");

module.exports = {

    createNewUser:(req, res)=> {
        db.User.insertOne(req.body.vals, (result) => {
            res.json({ id: result.insertId });
        });
    },
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
    updateUserById:(req, res)=> {
        db.User.updateOne(req.body.vals, req.params.id, (result) => {
            if (result.changedRows === 0) {
                res.status(204).end();
            } else {
                res.status(200).end();
            }
        });
    },
    deleteUserById:(req, res)=> {
        db.User.deleteOne(req.params.id, (data) => {
            res.status(200).json(data);
        });
    }
    
};
