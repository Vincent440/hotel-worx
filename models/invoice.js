const connection = require("../config/connection");

const Invoice = {
    selectOne: (id, cb) => {
        const queryString = "SELECT i.res_room_id, i.room_total, i.tax FROM invoices AS i WHERE i.invoice_id=? LIMIT 1";
        connection.execute(queryString, [id], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: (vals, cb) => {
        const queryString = "INSERT INTO invoices (res_room_id, room_total, tax) VALUES (?,?,?);";
        connection.execute(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
}

module.exports = Invoice;