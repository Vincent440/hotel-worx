const router = require("express").Router();

const db = require("../../models/index.js");

// '/api/testing' route
router.route("/").get( (req, res) => {
    res.status(200).send("sending this from the /api/testing route for any test routes");
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

// this route will need to be sent data like this: { "vals": ["Joe", "Blow", "222 E Market St", "Akron", "Ohio", "42116", "joeblow@gmail.com", "440-234-1234", "n/a", 1] }
router.post("/customers", (req, res) => {
    db.Customer.insertOne(req.body.vals, (result) => {
        res.json({ id: result.insertId });
    });
});

// this route will need to be sent data like this: { "vals": ["Joe", "Blow", "222 E Market St", "Akron", "Ohio", "42116", "joeblow@gmail.com", "440-234-1234", "n/a", 1] }
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

// this route will need to be sent data like this: { "vals": [1, 1, 2] }
router.post("/reservation", (req, res) => {
    db.Customer.insertOne(req.body.vals, (result) => {
        console.log(`Customer id ${result.insertId} has been added.`);
    });
    // result.insertId from the above query needs to be added to this query
    db.Reservation.insertOne(req.body.vals, (result) => {
        console.log(`Reservation id ${result.insertId} has been added.`);
    });
    // result.insertId from the above query needs to be added to this query for each row of rooms in the reservation
    db.ResRoom.insertOne(req.body.vals, (result) => {
        res.json({ id: result.insertId });
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
    const condition = "rr.check_in_date=CURDATE()"
    db.ResRoom.selectTodayArrivalsDepartures(condition, (result) => {
        res.json({ result });
    });
});

router.get("/todayDepartures", (req, res) => {
    const condition = "rr.check_out_date=CURDATE()"
    db.ResRoom.selectTodayArrivalsDepartures(condition, (result) => {
        res.json({ result });
    });
});

// this route will need to be sent data like this: { "vals": [[3, 1, "2019-09-11", "2019-09-17", 2], [3, 1, "2019-09-11", "2019-09-14", 1]] }
router.post("/res_rooms", (req, res) => {
    db.ResRoom.insertSome(req.body.vals, (result) => {
        res.json({ result });
    });
});

// the following 2 queries need to be run to cancel a reservation
// this one marks the reservation as not active for this reservation_id
router.put("/cancelReservation/:id", (req, res) => {
    db.Reservation.cancelOne(req.params.id, (result) => {
        console.log(`Changed reservation_id ${result.affectedRows} to canceled.`);
    });
    db.ResRoom.deleteSome(req.params.id, (data) => {
        res.json(data);
    });
});
// this one deletes all rooms in res_rooms for this reservation_id
router.delete("/res_rooms/:id", (req, res) => {
    db.ResRoom.deleteSome(req.params.id, (data) => {
        res.json(data);
    });
});

module.exports = router;