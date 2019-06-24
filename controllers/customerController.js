const db = require("../models/index.js");

module.exports = {

    createNewCustomer:(req, res) => {
        db.Customer.insertOne(req.body.vals, (result) => {
            res.json({ id: result.insertId });
        });
    },
    getAllCustomers:(req, res) => {
        db.Customer.selectAll((data) => {
            res.json(data);
        });
    },
    getCustomerById:(req, res) => {
        db.Customer.selectOne(req.params.id, (data) => {
            res.json(data);
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
    deleteCustomerById:(req, res) => {
        db.Customer.deleteOne(req.params.id, (data) => {
            res.json(data);
        });
    }

};