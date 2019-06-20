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

// this route will need to be sent data like this: { "vals": [] }
router.post("/rooms", (req, res) => {
    db.Room.insertOne(req.body.vals, (result) => {
        res.json({ id: result.insertId });
    });
});

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

router.post("/room_types", (req, res) => {
    db.RoomType.insertOne(req.body.type, (result) => {
        res.json({ id: result.insertId });
    });
});

router.put("/room_types/:id", (req, res) => {
    db.RoomType.updateOne(req.body.type, req.params.id, (result) => {
        if (result.changedRows === 0) {
            res.status(204).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;