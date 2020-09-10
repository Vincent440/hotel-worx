const connection = require('../config/connection')

const HotelInfo = {
  selectOne: (id, cb) => {
    const queryString =
      'SELECT hotel_info_id, hotel_name, address, city, state, zip, email, phone, image_url FROM hotel_info WHERE active=1 && hotel_info_id=? LIMIT 1;'
    connection.execute(queryString, [id], (err, results, fields) => {
      if (err) throw err
      cb(results)
    })
  }
}

module.exports = HotelInfo
