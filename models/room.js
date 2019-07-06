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
        const queryString = "SELECT rm.room_num, rm.clean, rm.occupied, rm.active, rt.type, rr.checked_in, rr.checked_out, rr.room_id, CASE WHEN rr.check_in_date=CURDATE() THEN ('Arrival') END AS arrival, CASE WHEN rr.check_out_date=CURDATE() THEN ('Due Out') END AS departure, CASE WHEN rr.check_in_date<CURDATE() && rr.check_out_date>CURDATE() THEN ('Stay Over') END AS stayover, CASE WHEN rm.active=0 THEN ('Out of Service') END AS inactive FROM rooms AS rm INNER JOIN room_types AS rt ON rm.room_type_id=rt.room_type_id LEFT JOIN (SELECT check_in_date, check_out_date, checked_in, checked_out, room_id FROM res_rooms WHERE check_in_date<=CURDATE() && check_out_date>=CURDATE()) AS rr ON rm.room_id=rr.room_id WHERE " + formattedConditions + " ORDER BY room_num ASC;";
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