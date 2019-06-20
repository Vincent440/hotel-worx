const connection = require("../config/connection");

const RoomType = {
    selectAll: (cb) => {
        const queryString = "SELECT room_type_id, type FROM room_types ORDER BY room_type_id ASC;";
        connection.query(queryString, (err, results) => {
            if (err) throw err;
            cb(results);
        });
    },
    selectOne: (id, cb) => {
        const queryString = "SELECT room_type_id, type FROM room_types WHERE room_type_id=? ORDER BY room_type_id ASC LIMIT 1;";
        connection.execute(queryString, [id], (err, results, fields) => {
            if (err) throw err;
            cb(results);
        });
    },
    deleteOne: (id, cb) => {
        const queryString = "DELETE FROM room_types WHERE room_type_id=?;";
        connection.execute(queryString, [id], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: (type, cb) => {
        const queryString = "INSERT INTO room_types (type) VALUES (?);";
        connection.execute(queryString, [type], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: (type, id, cb) => {
        const queryString = "UPDATE room_types SET type=? WHERE room_type_id=?;";
        connection.execute(queryString, [type, id], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
}

module.exports = RoomType;