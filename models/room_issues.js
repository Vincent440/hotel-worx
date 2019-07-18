const connection = require("../config/connection");

const RoomIssue = {
    insertOne: (vals, cb) => {
        const queryString = "INSERT INTO room_issues (room_id, issue, user_id) VALUES (?,?,?);";
        connection.execute(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: (vals, id, cb) => {
        vals.push(id);
        const queryString = "UPDATE room_issues SET room_id, issue=?, user_id, fixed=? WHERE room_issue_id=?;";
        connection.execute(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
};

module.exports = RoomIssue;