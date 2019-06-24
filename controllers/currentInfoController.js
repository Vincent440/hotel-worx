const db = require("../models/index.js");

module.exports = {

    getCurrentDateArrivals:(req, res) => {
        const condition = "rr.check_in_date=CURDATE()"
        db.ResRoom.selectTodayArrivalsDepartures(condition, (result) => {
            res.json({ result });
        });
    },
    getCurrentDateDepartures:(req, res) => {
        const condition = "rr.check_out_date=CURDATE()"
        db.ResRoom.selectTodayArrivalsDepartures(condition, (result) => {
            res.json({ result });
        });
    }

};