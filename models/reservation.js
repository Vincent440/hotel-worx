const connection = require("../config/connection");

const Reservation = {
    selectAll: (cb) => {
        const queryString = "SELECT r.reservation_id, r.customer_id, r.user_id, r.created_at, CONCAT(c.first_name, ' ', last_name) AS name, c.email, c.phone FROM reservations AS r INNER JOIN customers AS c ON r.customer_id=c.customer_id;";
        connection.execute(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    selectOne: (id, cb) => {
        const queryString = "SELECT r.reservation_id, r.customer_id, r.user_id, r.created_at, c.first_name, last_name, c.address, c.city, c.state, c.zip, c.email, c.phone, c.credit_card_num FROM reservations AS r INNER JOIN customers AS c ON r.customer_id=c.customer_id WHERE r.reservation_id=? LIMIT 1;";
        connection.execute(queryString, [id], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: (vals, cb) => {
        const queryString = "INSERT INTO reservations (customer_id, adults, user_id) VALUES (?,?,?);";
        connection.execute(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
}

module.exports = Reservation;