const db = require("../models/index.js");

module.exports = {

    createNewCustomerWithReservationAndRooms:(req, res) => {
        db.Customer.insertOne(req.body.cust, (result) => {
            console.log(`Customer id ${result.insertId} has been added.`);
            // result.insertId from the above query needs to be added to this query
            db.Reservation.insertOne(result.insertId, req.body.reserve, (result) => {
                console.log(`Reservation id ${result.insertId} has been added.`);
                // result.insertId from the above query needs to be added to this query for each row of rooms in the reservation
                db.ResRoom.insertSome(result.insertId, req.body.rooms, (result) => {
                    res.status(200).send("Customer, Reservation and Associated Rooms have been added!");
                });
            });
        });
    },
    getAllReservations:(req, res) => {
        db.Reservation.selectAll((data) => {
            res.json(data);
        });
    },
    getReservationById:(req, res) => {
        db.Reservation.selectOne(req.params.id, (result) => {
            res.json({ result });
        });
    },
    getReservationRoomsById:(req, res) => {
        db.ResRoom.selectSome(req.params.id, (result) => {
            res.json({ result });
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