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
    let conditions = [];
    let c1;
    if (req.params.clean === "true" && req.params.dirty === "false") {
        c1 = "rm.clean=1";
    } else if (req.params.clean === "false" && req.params.dirty === "true") {
        c1 = "rm.clean=0";
    } else {
        c1 = "(rm.clean=1 || rm.clean=0)";
    }
    conditions.push(c1);
    let c3;
    if (req.params.vacant === "true" && req.params.occupied === "false") {
        c3 = "rm.occupied=0";
    } else if (req.params.vacant === "false" && req.params.occupied === "true") {
        c3 = "rm.occupied=1";
    } else {
        c3 = "(rm.occupied=1 || rm.occupied=0)";
    }
    conditions.push(c3);
    let criteria4 = [];
    if (req.params.arrival === "true") {
        criteria4.push("(rr.check_in_date=CURDATE() && rr.checked_in=0)");
    }
    if (req.params.arrived === "true") {
        criteria4.push("(rr.checked_in=1 && rr.check_in_date=CURDATE() && rr.checked_out=0)");
    }
    if (req.params.departed === "true") {
        criteria4.push("rr.checked_out=1");
    }
    if (req.params.stayOver === "true") {
        criteria4.push("(CURDATE()>rr.check_in_date && CURDATE()<rr.check_out_date)");
    }
    if (req.params.dueOut === "true") {
        criteria4.push("(rr.check_out_date=CURDATE() && rr.checked_out=0)");
    }
    if (req.params.notReserved === "true") {
        criteria4.push("((rr.check_in_date IS NULL || (CURDATE() NOT BETWEEN rr.check_in_date AND rr.check_out_date)) && rm.active=1)");
    }
    const c4 = "(" + criteria4.join(" || ") + ")";
    if (req.params.arrival === "true" || req.params.arrived === "true" || req.params.departed === "true" || req.params.stayOver === "true" || req.params.dueOut === "true" || req.params.notReserved === "true") {
        conditions.push(c4);
    }
    if (req.params.oos === "true") {
        conditions = ["rm.active=0"]
    } else {
        conditions.push("(rm.active=1 || rm.active=0)");
    }
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
    db.RoomType.selectAvailable(req.params.date, (data) => {
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
        res.json(result);
    });
});
// this route gets all rooms associated with a reservation_id
router.get("/res_rooms/:id", (req, res) => {
    db.ResRoom.selectSome(req.params.id, (result) => {
        res.json(result);
    });
});

router.get("/arrivals/:sdate/:edate/:fname/:lname/:cnum", (req, res) => {
    const todayDate = new Date().toISOString().slice(0,10);
    let conditions = [];
    let c1;
    if (req.params.sdate !== "undefined" && req.params.edate !== "undefined") {
        c1 = "(rr.check_in_date>='" + req.params.sdate + "' && rr.check_in_date<='" + req.params.edate + "')";
        conditions.push(c1);
    }
    if (req.params.fname !== "undefined") {
        conditions.push("c.first_name LIKE '%" + req.params.fname + "%'");
    }
    if (req.params.lname !== "undefined") {
        conditions.push("c.last_name LIKE '%" + req.params.lname + "%'");
    }
    if (req.params.cnum !== "undefined") {
        conditions.push("rr.confirmation_code LIKE '%" + req.params.cnum + "%'");
    }
    conditions.length===0 ? conditions.push("(rr.check_in_date='" + todayDate + "')") : conditions;
    // const condition = "(rr.check_in_date>='" + req.params.sdate + "' && rr.check_in_date<='" + req.params.edate + "')";
    db.ResRoom.selectArrivals(conditions, (result) => {
        res.json(result);
    });
});

router.get("/departures", (req, res) => {
    const condition = "rr.check_out_date=CURDATE()";
    db.ResRoom.selectDepartures(condition, (result) => {
        res.json(result);
    });
});

// this route will need to be sent data like this: { "vals": [[2, "2019-08-12", "2019-08-15", 2, "20190621HW000001", "need a good view"]] }
router.post("/res_rooms", (req, res) => {
    db.ResRoom.insertSome(req.body.vals, (result) => {
        res.json({result});
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