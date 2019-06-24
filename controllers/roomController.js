const db = require("../models/index.js");

module.exports = {

    getAllRooms:(req, res) => {
        db.Room.selectAll((data) => {
            res.json(data);
        });
    },
    createNewRoom:(req, res) => {
        db.Room.insertOne(req.body.vals, (result) => {
            res.json({ id: result.insertId });
        });
    },
    getRoomById:(req, res) => {
        db.Room.selectOne(req.params.id, (data) => {
            res.json(data);
        });
    },
    updateRoomById:(req, res) => {
        db.Room.updateOne(req.body.vals, req.params.id, (result) => {
            if (result.changedRows === 0) {
                res.status(204).end();
            } else {
                res.status(200).end();
            }
        });
    },
    deleteRoomById:(req, res) => {
        db.Room.deleteOne(req.params.id, (data) => {
            res.json(data);
        });
    }
};