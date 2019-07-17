const db = require("../models/index.js");

module.exports = {

    createNewCustomerWithReservationAndRooms:(req, res) => {
        db.Customer.insertOne(req.body.cust, (result) => {
            db.Reservation.insertOne(result.insertId, req.body.reserve, (result) => {
                const reservationId = result.insertId;
                db.ResRoom.insertSome(result.insertId, req.body.rooms, () => {
                    res.status(200).send({ reservation_id: reservationId });
                });
            });
        });
    },
    getAllReservations:(req, res) => {
        db.Reservation.selectAll((data) => {
            res.status(200).json(data);
        });
    },
    getReservationById:(req, res) => {
        db.Reservation.selectOne(req.params.id, (result) => {
            res.json(result);
        });
    },
    getRoomsConnectedToReservationById:(req, res) => {
        db.ResRoom.selectSome(req.params.id, (result) => {
            res.json(result);
        });
    },
    cancelReservationById:(req, res) => {
        db.Reservation.cancelOne(req.params.id, (result) => {
            console.log(`Changed reservation_id ${result.affectedRows} to canceled.`);
            db.ResRoom.deleteSome(req.params.id, (data) => {
                res.json(data);
            });
        });
    }
    
};