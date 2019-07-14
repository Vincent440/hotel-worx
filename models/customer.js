const connection = require("../config/connection");

const Customer = {
    selectAll: (cb) => {
        const queryString = "SELECT customer_id, first_name, last_name, address, city, state, zip, email, phone, credit_card_num, cc_expiration, active FROM customers ORDER BY customer_id ASC;";
        connection.query(queryString, (err, results) => {
            if (err) throw err;
            cb(results);
        });
    },
    selectOne: (id, cb) => {
        const queryString = "SELECT customer_id, first_name, last_name, address, city, state, zip, email, phone, credit_card_num, cc_expiration, active FROM customers WHERE customer_id=? ORDER BY customer_id ASC;";
        connection.execute(queryString, [id], (err, results, fields) => {
            if (err) throw err;
            cb(results);
        });
    },
    deleteOne: (id, cb) => {
        const queryString = "DELETE FROM customers WHERE customer_id=?;";
        connection.execute(queryString, [id], (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: (vals, cb) => {
        const queryString = "INSERT INTO customers (first_name, last_name, address, city, state, zip, email, phone, credit_card_num, cc_expiration, active) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        connection.execute(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: (vals, id, cb) => {
        vals.push(id);
        const queryString = "UPDATE customers SET first_name=?, last_name=?, address=?, city=?, state=?, zip=?, email=?, phone=?, credit_card_num=?, cc_expiration=?, active=? WHERE customer_id=?;";
        connection.execute(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }
};

module.exports = Customer;