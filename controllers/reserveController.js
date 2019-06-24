// const db = require("../models/index.js");

module.exports = {

    getAllReservations:(req, res) => {
        // '/api/reserve' GET DATA FOR MAKING A NEW RESERVATION
        res.status(200).send("<h3>Successful GET '/api/reserve' route</h3>");
    },
    getReservationById:(req, res) => {
        // '/api/reserve/:id' GET INFO FOR A RESERVATION ID
        res.status(200).send("<h3>Successful GET '/api/reserve/:id' route</h3>");
    },
    updateReservationById:(req, res) => {
        // '/api/reserve/:id' PUT UPDATED INFO FOR A RESERVATION ID
        res.status(200).send("<h3>Successful PUT to Update'/api/reserve/:id' route</h3>");
    }
    
};