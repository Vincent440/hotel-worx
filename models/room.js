const connection = require("../config/connection");

const Room = {
    selectAll: (cb) => {
        const queryString = "SELECT r.room_id, r.room_num, r.description, r.num_beds, r.clean, r.occupied, r.active, t.room_type_id, t.type, t.rate FROM rooms AS r INNER JOIN room_types AS t ON r.room_type_id=t.room_type_id ORDER BY room_num ASC;";
        connection.query(queryString, (err, results) => {
            if (err) throw err;
            cb(results);
        });
    },
    selectOne: (id, cb) => {
        const queryString = "SELECT r.room_id, r.room_num, r.description, r.num_beds, r.clean, r.occupied, r.active, t.room_type_id, t.type, t.rate FROM rooms AS r INNER JOIN room_types AS t ON r.room_type_id=t.room_type_id WHERE r.room_id=? ORDER BY room_num ASC LIMIT 1;";
        connection.execute(queryString, [id], (err, results, fields) => {
            if (err) throw err;
            cb(results);
        });
    },
    deleteOne: (id, cb) => {
        const queryString = "DELETE FROM rooms WHERE room_id=?;";
        connection.execute(queryString, [id], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: (vals, cb) => {
        const queryString = "INSERT INTO rooms (room_num, room_type_id, description, num_beds, clean, occupied, active) VALUES (?,?,?,?,?,?,?);";
        connection.execute(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: (vals, id, cb) => {
        vals.push(id);
        const queryString = "UPDATE rooms SET room_num=?, room_type_id=?, description=?, num_beds=?, clean=?, occupied=?, active=? WHERE room_id=?;";
        connection.execute(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
}

module.exports = Room;