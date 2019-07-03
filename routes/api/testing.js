const router = require("express").Router();

const db = require("../../models/index.js");

// '/api/testing' route
router.route("/").get((req, res) => {
    res.status(200).send("sending this from the /api/testing route for any test routes");
});

router.get("/users/:id", (req, res) => {
    db.User.selectOneById(req.params.id, (data) => {
        res.json(data);
    });
});

// this route will need to be sent data like: { "vals": ["test_user", "111111", 1] }
router.post("/users", (req, res) => {
    db.User.insertOne(req.body.vals, (result) => {
        res.json({ id: result.insertId });
    });
});

// this route will need to be sent data like: { "vals": ["test_user", "111111", 1] }
router.put("/users/:id", (req, res) => {
    db.User.updateOne(req.body.vals, req.params.id, (result) => {
        if (result.changedRows === 0) {
            res.status(204).end();
        } else {
            res.status(200).end();
        }
    });
});

router.get("/customers", (req, res) => {
    db.Customer.selectAll((data) => {
        res.json(data);
    });
});

router.get("/customers/:id", (req, res) => {
    db.Customer.selectOne(req.params.id, (data) => {
        res.json(data);
    });
});

router.delete("/customers/:id", (req, res) => {
    db.Customer.deleteOne(req.params.id, (data) => {
        res.json(data);
    });
});

// this route will need to be sent data like this: { "vals": ["Joe", "Blow", "222 E Market St", "Akron", "Ohio", "42116", "joeblow@gmail.com", "440-234-1234", "1234567890123456", "11-21", 1] }
router.post("/customers", (req, res) => {
    db.Customer.insertOne(req.body.vals, (result) => {
        res.json({ id: result.insertId });
    });
});

// this route will need to be sent data like this: { "vals": ["Joe", "Blow", "222 E Market St", "Akron", "Ohio", "42116", "joeblow@gmail.com", "440-234-1234", "1234567890123456", "11-21", 1] }
router.put("/customers/:id", (req, res) => {
    db.Customer.updateOne(req.body.vals, req.params.id, (result) => {
        if (result.changedRows === 0) {
            res.status(204).end();
        } else {
            res.status(200).end();
        }
    });
});

router.get("/rooms", (req, res) => {
    db.Room.selectAll((data) => {
        res.json(data);
    });
});

router.get("/rooms/:id", (req, res) => {
    db.Room.selectOne(req.params.id, (data) => {
        res.json(data);
    });
});

router.get("/rooms_clean", (req, res) => {
    const condition = "rm.clean=1";
    db.Room.selectSome(condition, (data) => {
        res.json(data);
    });
});

router.get("/rooms_inactive", (req, res) => {
    const condition = "rm.active=0";
    db.Room.selectSome(condition, (data) => {
        res.json(data);
    });
});

router.get("/rooms_occupied", (req, res) => {
    const condition = "rm.occupied=1";
    db.Room.selectSome(condition, (data) => {
        res.json(data);
    });
});

router.get("/rooms_vacant", (req, res) => {
    const condition = "rm.occupied=0";
    db.Room.selectSome(condition, (data) => {
        res.json(data);
    });
});

router.get("/rooms_dirty", (req, res) => {
    const condition = "rm.clean=0";
    db.Room.selectSome(condition, (data) => {
        res.json(data);
    });
});

router.get("/housekeeping_status/:clean/:dirty/:oos/:vacant/:occupied/:arrival/:arrived/:stayOver/:dueOut/:departed/:notReserved", (req, res) => {
    let criteria1 = [];
    req.params.clean === "true" ? criteria1.push("rm.clean=1") : criteria1.push("rm.clean=2");
    req.params.dirty === "true" ? criteria1.push("rm.clean=0") : criteria1.push("rm.clean=2");
    const c1 = "(" + criteria1.join(" || ") + ")";
    let c2 = [];
    req.params.oos === "true" ? c2.push("rm.active=0") : c2.push("rm.active=1");
    let criteria3 = [];
    req.params.vacant === "true" ? criteria3.push("rm.occupied=0") : criteria3.push("rm.occupied=2");
    req.params.occupied === "true" ? criteria3.push("rm.occupied=1") : criteria3.push("rm.occupied=2");
    const c3 = "(" + criteria3.join(" || ") + ")";
    let criteria4 = [];
    if (req.params.arrival === "true") {
        criteria4.push("rr.check_in_date=CURDATE()");
    }
    if (req.params.arrived === "true") {
        criteria4.push("rr.checked_in=1");
    }
    if (req.params.stayOver === "true") {
        criteria4.push("(CURDATE()>rr.check_in_date && CURDATE()<rr.check_out_date)");
    }
    if (req.params.dueOut === "true") {
        criteria4.push("rr.check_out_date=CURDATE()");
    }
    req.params.departed === "true" ? criteria4.push("rr.checked_out=1") : criteria4.push("rr.checked_out=2");

    // req.params.arrival === "true" ? criteria4.push("rr.check_in_date=CURDATE()") : criteria4.push("rr.check_in_date!=CURDATE()");
    // req.params.arrived === "true" ? criteria4.push("rr.checked_in=1") : criteria4.push("rr.checked_in=2");
    // req.params.stayOver === "true" ? criteria4.push("CURDATE() BETWEEN rr.check_in_date && DATE_ADD(rr.check_out_date, INTERVAL 1 DAY)") : criteria4.push("rr.check_in_date!=CURDATE()");
    // req.params.dueOut === "true" ? criteria4.push("rr.check_out_date=CURDATE()") : criteria4.push("rr.check_out_date!=CURDATE()");

    const c4 = "(" + criteria4.join(" || ") + ")";
    const conditions = [c1, c2, c3, c4];
    db.Room.housekeepingStatus(conditions, (data) => {
        res.json(data);
    });
});

router.delete("/rooms/:id", (req, res) => {
    db.Room.deleteOne(req.params.id, (data) => {
        res.json(data);
    });
});

// this route will need to be sent data like this: { "vals": ["208", 2, "microwave and courtyard view", 2, 1, 0, 1] }
router.post("/rooms", (req, res) => {
    db.Room.insertOne(req.body.vals, (result) => {
        res.json({ id: result.insertId });
    });
});

// this route will need to be sent data like this: { "vals": ["208", 2, "microwave and courtyard view", 2, 1, 0, 1] }
router.put("/rooms/:id", (req, res) => {
    db.Room.updateOne(req.body.vals, req.params.id, (result) => {
        if (result.changedRows === 0) {
            res.status(204).end();
        } else {
            res.status(200).end();
        }
    });
});

router.get("/room_types", (req, res) => {
    db.RoomType.selectAll((data) => {
        res.json(data);
    });
});

router.get("/room_types/:id", (req, res) => {
    db.RoomType.selectOne(req.params.id, (data) => {
        res.json(data);
    });
});

router.get("/room_types_available/:date", (req, res) => {
    db.RoomType.selectAvailable([req.params.date, req.params.date], (data) => {
        res.json(data);
    });
});

router.delete("/room_types/:id", (req, res) => {
    db.RoomType.deleteOne(req.params.id, (data) => {
        res.json(data);
    });
});

// this route will need to be sent data like this: { "vals": ["2Double", 109.99] }
router.post("/room_types", (req, res) => {
    db.RoomType.insertOne(req.body.vals, (result) => {
        res.json({ id: result.insertId });
    });
});

// this route will need to be sent data like this: { "vals": ["2Double", 109.99] }
router.put("/room_types/:id", (req, res) => {
    db.RoomType.updateOne(req.body.vals, req.params.id, (result) => {
        if (result.changedRows === 0) {
            res.status(204).end();
        } else {
            res.status(200).end();
        }
    });
});

// { "cust": ["first_name", "last_name", "address", "city", "state", "zip", "email", "phone", "credit_card_num", "cc_expiration", "active"], "reserve": ["user_id", "comments"], "rooms": [["room_type_id", "check_in_date", "check_out_date", "adults", "confirmation_code", "comments"], ["room_type_id", "check_in_date", "check_out_date", "adults", "confirmation_code", "comments"], ["room_type_id", "check_in_date", "check_out_date", "adults", "confirmation_code", "comments"]] }
// this route will need to be sent data like this: { "cust": ["Peter", "Pan", "1111 FairyTale Lane", "Fantasyland", "Vermont", "23456", "p.pan@yahoo.net", "555-1212", "1234567890123456", "11-21", 1], "reserve": [1, ""], "rooms": [[2, "2019-08-12", "2019-08-15", 2, "20190621HW000001", "need a good view"]] }
router.post("/reservation", (req, res) => {
    db.Customer.insertOne(req.body.cust, (result) => {
        // console.log(`Customer id ${result.insertId} has been added.`);
        // result.insertId from the above query needs to be added to this query
        db.Reservation.insertOne(result.insertId, req.body.reserve, (result) => {
            const reservationId = result.insertId;
            console.log(`Reservation id ${reservationId} has been added.`);
            // result.insertId from the above query needs to be added to this query for each row of rooms in the reservation
            db.ResRoom.insertSome(reservationId, req.body.rooms, (result) => {
                res.status(200).send({ reservation_id: reservationId });
            });
        });
    });
});

router.get("/reservations", (req, res) => {
    db.Reservation.selectAll((data) => {
        res.json(data);
    });
});

// to get info about a reservation, both of these 2 queries need to be returned
// this route gets a reservation by id with customer info
router.get("/reservations/:id", (req, res) => {
    db.Reservation.selectOne(req.params.id, (result) => {
        res.json({ result });
    });
});
// this route gets all rooms associated with a reservation_id
router.get("/res_rooms/:id", (req, res) => {
    db.ResRoom.selectSome(req.params.id, (result) => {
        res.json({ result });
    });
});

router.get("/todayArrivals", (req, res) => {
    const condition = "rr.check_in_date=CURDATE()";
    db.ResRoom.selectTodayArrivalsDepartures(condition, (result) => {
        res.json({ result });
    });
});

router.get("/todayDepartures", (req, res) => {
    const condition = "rr.check_out_date=CURDATE()";
    db.ResRoom.selectTodayArrivalsDepartures(condition, (result) => {
        res.json({ result });
    });
});

// this route will need to be sent data like this: { "vals": [[2, "2019-08-12", "2019-08-15", 2, "20190621HW000001", "need a good view"]] }
router.post("/res_rooms", (req, res) => {
    db.ResRoom.insertSome(req.body.vals, (result) => {
        res.json({ result });
    });
});

router.put("/cancelReservation/:id", (req, res) => {
    db.Reservation.cancelOne(req.params.id, (result) => {
        console.log(`Changed reservation_id ${result.affectedRows} to canceled.`);
        db.ResRoom.deleteSome(req.params.id, (data) => {
            res.json(data);
        });
    });
});

module.exports = router;