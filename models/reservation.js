const connection = require("../config/connection");

const Reservation = {
    selectAll: (cb) => {
        const queryString = "SELECT r.reservation_id, u.username, r.created_at, r.active, CONCAT(c.last_name, ', ', c.first_name) AS name, c.email, c.phone, rt.type, rt.rate, rm.room_num, rr.check_in_date, rr.check_out_date, rr.adults FROM reservations AS r INNER JOIN customers AS c ON r.customer_id=c.customer_id INNER JOIN res_rooms AS rr ON r.reservation_id=rr.reservation_id INNER JOIN room_types AS rt ON rr.room_type_id=rt.room_type_id INNER JOIN users AS u ON r.user_id=u.user_id LEFT JOIN rooms AS rm ON rr.room_id=rm.room_id ORDER BY r.reservation_id ASC, rr.res_room_id ASC;";
        connection.execute(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    selectOne: (id, cb) => {
        const queryString = "SELECT r.reservation_id, r.customer_id, r.user_id, r.created_at, r.active, c.first_name, c.last_name, c.address, c.city, c.state, c.zip, c.email, c.phone, c.credit_card_num FROM reservations AS r INNER JOIN customers AS c ON r.customer_id=c.customer_id WHERE r.reservation_id=? LIMIT 1;";
        connection.execute(queryString, [id], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: (vals, cb) => {
        const queryString = "INSERT INTO reservations (customer_id, user_id) VALUES (?,?);";
        connection.execute(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    cancelOne: (id, cb) => {
        const queryString = "UPDATE reservations SET active=0 WHERE reservation_id=?;";
        connection.execute(queryString, [id], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
}

module.exports = Reservation;