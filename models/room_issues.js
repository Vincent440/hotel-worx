const connection = require("../config/connection");

const RoomIssue = {
    selectAll: (cb) => {
        const queryString = "SELECT ri.room_issue_id, ri.issue, ri.start_date, ri.end_date, rt.type, rm.room_num FROM room_issues AS ri INNER JOIN rooms AS rm ON ri.room_id=rm.room_id INNER JOIN room_types AS rt ON rm.room_type_id=rt.room_type_id WHERE ri.fixed=0 ORDER BY rm.room_num ASC;";
        connection.query(queryString, (err, results) => {
            if (err) throw err;
            cb(results);
        });
    },
    insertOne: (vals, cb) => {
        const queryString = "INSERT INTO room_issues (room_id, issue, user_id, start_date, end_date) VALUES (?,?,?,?,?);";
        connection.execute(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: (vals, id, cb) => {
        vals.push(id);
        const queryString = "UPDATE room_issues SET room_id=?, issue=?, start_date=?, end_date=?, user_id=? WHERE room_issue_id=?;";
        connection.execute(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateOneFixed: (id, cb) => {
        vals.push(id);
        const queryString = "UPDATE room_issues SET fixed=1 WHERE room_issue_id=?;";
        connection.execute(queryString, [id], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
};

module.exports = RoomIssue;