const connection = require("../config/connection");

const RoomType = {
    selectAll: (cb) => {
        const queryString = "SELECT room_type_id, type, rate FROM room_types ORDER BY room_type_id ASC;";
        connection.query(queryString, (err, results) => {
            if (err) throw err;
            cb(results);
        });
    },
    selectOne: (id, cb) => {
        const queryString = "SELECT room_type_id, type, rate FROM room_types WHERE room_type_id=? ORDER BY room_type_id ASC LIMIT 1;";
        connection.execute(queryString, [id], (err, results, fields) => {
            if (err) throw err;
            cb(results);
        });
    },
    selectAvailableOld: (cb) => {
        const queryString = "SELECT rm.room_type_id, COUNT(rm.room_id) AS available, rt.type FROM rooms AS rm INNER JOIN room_types AS rt ON rm.room_type_id=rt.room_type_id WHERE rm.active=1 GROUP BY rt.type;";
        connection.query(queryString, (err, results) => {
            if (err) throw err;
            cb(results);
        });
    },
    selectAvailable: (date, cb) => {
        console.log(date);
        const queryString = "SELECT rt.room_type_id, rt.type, IFNULL(rm1.available, 0) AS available FROM room_types AS rt LEFT JOIN (SELECT rm.room_type_id, COUNT(rm.room_id) AS available FROM rooms AS rm WHERE rm.active=1 && rm.room_id NOT IN (SELECT rr.room_id FROM res_rooms AS rr WHERE rr.check_in_date<=? && rr.check_out_date>?) GROUP BY rm.room_type_id) AS rm1 ON rt.room_type_id=rm1.room_type_id ORDER BY rt.room_type_id ASC;";
        connection.query(queryString, date, (err, results) => {
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
    insertOne: (vals, cb) => {
        const queryString = "INSERT INTO room_types (type, rate) VALUES (?,?);";
        connection.execute(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: (vals, id, cb) => {
        vals.push(id);
        const queryString = "UPDATE room_types SET type=?, rate=? WHERE room_type_id=?;";
        connection.execute(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
}

module.exports = RoomType;