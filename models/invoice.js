const connection = require("../config/connection");

const Invoice = {
    selectOne: (id, cb) => {
        const queryString = "SELECT i.res_room_id, i.num_days, i.rate, i.county_tax, i.city_tax, i.state_tax, rm.room_num, c.first_name, c.last_name FROM invoices AS i INNER JOIN res_rooms AS rr ON i.res_room_id=rr.res_room_id INNER JOIN reservations AS r ON rr.reservation_id=r.reservation_id INNER JOIN customers AS c ON c.customer_id=r.customer_id INNER JOIN rooms AS rm ON rr.room_id=rm.room_id WHERE i.invoice_id=? LIMIT 1";
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