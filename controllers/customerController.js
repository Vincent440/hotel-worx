const db = require("../models/index.js");

module.exports = {

    createNewCustomer:(req, res) => {
        db.Customer.insertOne(req.body.vals, (result) => {
            res.status(200).json({ id: result.insertId });
        });
    },
    getAllCustomers:(req, res) => {
        db.Customer.selectAll((data) => {
            res.status(200).json(data);
        });
    },
    getCustomerById:(req, res) => {
        db.Customer.selectOne(req.params.id, (data) => {
            res.status(200).json(data);
        });
    },
    updateCustomerById:(req, res) => {
        db.Customer.updateOne(req.body.vals, req.params.id, (result) => {
            if (result.changedRows === 0) {
                res.status(204).end();
            } else {
                res.status(200).end();
            }
        });
    },
    deleteCustomerById:(req, res) => { // MUST INVESTIGATE FOREIGN KEY CONSTRAINT FAILS
        db.Customer.deleteOne(req.params.id, (data) => {
            res.status(200).json(data);
        });
    }

};