const connection = require("../config/connection");

const Invoice = {
    selectOne: (id, cb) => {
        const queryString = "SELECT i.res_room_id, i.num_days, i.rate, i.county_tax, i.city_tax, i.state_tax FROM invoices AS i WHERE i.invoice_id=? LIMIT 1";
        connection.execute(queryString, [id], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: (vals, cb) => {
        const queryString = "INSERT INTO invoices (res_room_id, num_days, rate, county_tax, city_tax, state_tax) VALUES (?,?,?,?,?,?);";
        connection.execute(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
}

module.exports = Invoice;