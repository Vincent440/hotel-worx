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
    selectAvailable: (date, cb) => {
        const preQueryString = "SET @input_date=?;";
        const days_to_show = 14;
        let queryString = "";
        for (let i=0; i<days_to_show; i++) {
            i>0 ? queryString += " UNION ALL " : "";
            queryString += "SELECT rm3.date, COALESCE(SUM(rm3.rt1), 0) AS RoomType1, COALESCE(SUM(rm3.rt2), 0) AS RoomType2, COALESCE(SUM(rm3.rt3), 0) AS RoomType3, (COALESCE(SUM(rm3.rt1), 0) + COALESCE(SUM(rm3.rt2), 0) + COALESCE(SUM(rm3.rt3), 0)) AS TotalRooms FROM (SELECT (DATE_ADD(@input_date, INTERVAL " + i + " DAY)) AS date, CASE WHEN rm2.room_type_id=1 THEN rm2.available_types END AS rt1, CASE WHEN rm2.room_type_id=2 THEN rm2.available_types END AS rt2, CASE WHEN rm2.room_type_id=3 THEN rm2.available_types END AS rt3 FROM (SELECT rm1.room_type_id, COALESCE(rm1.total_types, 0)-COALESCE(rr1.used_types, 0) AS available_types FROM room_types AS rt LEFT JOIN (SELECT rr.room_type_id, COUNT(*) AS used_types FROM res_rooms AS rr WHERE rr.active=1 && rr.check_in_date<=DATE_ADD(@input_date, INTERVAL " + i + " DAY) && rr.check_out_date>DATE_ADD(@input_date, INTERVAL " + i + " DAY) GROUP BY rr.room_type_id) AS rr1 ON rt.room_type_id=rr1.room_type_id LEFT JOIN (SELECT rm.room_type_id, COUNT(*) AS total_types FROM rooms AS rm WHERE rm.active=1 GROUP BY rm.room_type_id) AS rm1 ON rt.room_type_id=rm1.room_type_id GROUP BY rt.room_type_id ORDER BY rt.room_type_id ASC) AS rm2) AS rm3 GROUP BY rm3.date";
            i===days_to_show-1 ? queryString += ";" : "";
        }
        connection.query(preQueryString + queryString, [date], (err, results) => {
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