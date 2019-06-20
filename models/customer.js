const connection = require("../config/connection");

const Customer = {
    selectAll: (cb) => {
        const queryString = "SELECT customer_id, first_name,last_name, address, city, state, zip, email, phone, active FROM customers ORDER BY customer_id ASC;";
        connection.query(queryString, (err, results) => {
            if (err) throw err;
            cb(results);
        });
    },
    selectOne: (id, cb) => {
        const queryString = "SELECT customer_id, first_name,last_name, address, city, state, zip, email, phone, active FROM customers WHERE customer_id=? ORDER BY customer_id ASC;";
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
    insertOne: (cb) => {
        
    },
    updateOne: (cb) => {
        
    }
}

module.exports = Customer;