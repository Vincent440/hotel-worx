const connection = require("../config/connection");

const Room = {
    selectAll: (cb) => {
        const queryString = "SELECT rm.room_id, rm.room_num, rm.description, rm.num_beds, rm.clean, rm.occupied, rm.active, rt.room_type_id, rt.type, rt.rate FROM rooms AS rm INNER JOIN room_types AS rt ON rm.room_type_id=rt.room_type_id ORDER BY room_num ASC;";
        connection.query(queryString, (err, results) => {
            if (err) throw err;
            cb(results);
        });
    },
    selectOne: (id, cb) => {
        const queryString = "SELECT rm.room_id, rm.room_num, rm.description, rm.num_beds, rm.clean, rm.occupied, rm.active, rt.room_type_id, rt.type, rt.rate FROM rooms AS rm INNER JOIN room_types AS rt ON rm.room_type_id=rt.room_type_id WHERE rm.room_id=? ORDER BY room_num ASC LIMIT 1;";
        connection.execute(queryString, [id], (err, results, fields) => {
            if (err) throw err;
            cb(results);
        });
    },
    housekeepingStatus: (conditions, cb) => {
        formattedConditions = conditions.join(" && ");
        console.log(formattedConditions);
        const queryString = "SELECT rm.room_id, rm.room_num, rm.clean, rm.occupied, rm.active, rt.type, rr.check_in_date, rr.check_out_date, rr.checked_in, rr.checked_out FROM rooms AS rm INNER JOIN room_types AS rt ON rm.room_type_id=rt.room_type_id LEFT JOIN res_rooms AS rr ON rm.room_id=rr.room_id WHERE " + formattedConditions + " ORDER BY room_num ASC;";
        connection.query(queryString, (err, results) => {
            if (err) throw err;
            cb(results);
        });
    },
    selectSome: (condition, cb) => {
        const queryString = "SELECT rm.room_id, rm.room_num, rm.description, rm.num_beds, rm.clean, rm.occupied, rm.active, rt.room_type_id, rt.type, rt.rate FROM rooms AS rm INNER JOIN room_types AS rt ON rm.room_type_id=rt.room_type_id WHERE " + condition + " ORDER BY room_num ASC;";
        connection.query(queryString, (err, results) => {
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