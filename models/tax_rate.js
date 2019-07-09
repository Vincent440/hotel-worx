const connection = require("../config/connection");

const TaxRate = {
    selectRates: (cb) => {
        const queryString = "SELECT county_tax_rate, city_tax_rate, state_tax_rate FROM tax_rates WHERE tax_rate_id=1;";
        connection.query(queryString, (err, results) => {
            if (err) throw err;
            cb(results);
        });
    }
}

module.exports = TaxRate;