const connection = require('../config/connection')

const ResRoom = {
  selectForHouseStatus: (date, cb) => {
    const preQueryString = 'SET @input_date=?;'
    const queryString =
      'SELECT COALESCE(SUM(CASE WHEN rr.check_in_date<@input_date && rr.check_out_date>@input_date THEN 1 ELSE 0 END), 0) AS stayovers, COALESCE(SUM(CASE WHEN rr.check_out_date=@input_date && rr.checked_out=0 THEN 1 ELSE 0 END), 0) AS departuresPending, COALESCE(SUM(CASE WHEN rr.check_out_date=@input_date && rr.checked_out=1 THEN 1 ELSE 0 END), 0) AS departuresActual, COALESCE(SUM(CASE WHEN rr.check_in_date=@input_date && rr.checked_in=0 && rr.active=1 THEN 1 ELSE 0 END), 0) AS arrivalsPending, COALESCE(SUM(CASE WHEN rr.check_in_date=@input_date && rr.checked_in=1 THEN 1 ELSE 0 END), 0) AS arrivalsActual FROM res_rooms AS rr WHERE rr.active=1 && (rr.check_in_date<@input_date && rr.check_out_date>@input_date) || rr.check_out_date=@input_date || rr.check_in_date=@input_date;'
    connection.query(preQueryString + queryString, [date], (err, result) => {
      if (err) throw err
      cb(result[1])
    })
  },
  selectArrivals: (conditions, cb) => {
    formattedConditions = conditions.join(' && ')
    const queryString =
      "SELECT r.reservation_id, CONCAT(c.first_name, ' ', c.last_name) AS name, rr.res_room_id, rr.room_type_id, DATE_FORMAT(rr.check_in_date, '%b %d, %Y') AS check_in_date, DATE_FORMAT(rr.check_out_date, '%b %d, %Y') AS check_out_date, rr.checked_in, rr.checked_out, IFNULL(rm.room_num, 'Not Set') AS room_num, rt.type, '' AS selectedRoom FROM reservations AS r INNER JOIN customers AS c ON r.customer_id=c.customer_id INNER JOIN res_rooms AS rr ON r.reservation_id=rr.reservation_id INNER JOIN room_types AS rt ON rr.room_type_id=rt.room_type_id LEFT JOIN rooms AS rm ON rr.room_id=rm.room_id WHERE rr.active=1 && " +
      formattedConditions +
      ' ORDER BY rr.res_room_id ASC;'
    connection.query(queryString, (err, result) => {
      if (err) throw err
      cb(result)
    })
  },
  selectDepartures: (conditions, cb) => {
    formattedConditions = conditions.join(' && ')
    const queryString =
      "SELECT r.reservation_id, CONCAT(c.first_name, ' ', c.last_name) AS name, rr.res_room_id, rr.room_type_id, DATE(check_out_date)-DATE(check_in_date) AS num_days, DATE_FORMAT(rr.check_in_date, '%b %d, %Y') AS check_in_date, DATE_FORMAT(rr.check_out_date, '%b %d, %Y') AS check_out_date, rr.checked_in, rr.checked_out, rr.rate, IFNULL(rm.room_num, 'Not Set') AS room_num, rt.type FROM reservations AS r INNER JOIN customers AS c ON r.customer_id=c.customer_id INNER JOIN res_rooms AS rr ON r.reservation_id=rr.reservation_id INNER JOIN room_types AS rt ON rr.room_type_id=rt.room_type_id LEFT JOIN rooms AS rm ON rr.room_id=rm.room_id WHERE rr.active=1 && rr.checked_in && " +
      formattedConditions +
      ' ORDER BY rm.room_num ASC;'
    connection.query(queryString, (err, result) => {
      if (err) throw err
      cb(result)
    })
  },
  countPendingDeparturesByRoomType: (date, cb) => {
    const queryString =
      'SELECT rt.room_type_id, rt.type, COUNT(rr.room_type_id) AS pending_departures FROM res_rooms AS rr INNER JOIN room_types AS rt ON rr.room_type_id=rt.room_type_id WHERE rr.active=1 && rr.checked_out=0 && rr.check_out_date=? GROUP BY rr.room_type_id ORDER BY rt.room_type_id ASC;'
    connection.execute(queryString, [date], (err, result) => {
      if (err) throw err
      cb(result)
    })
  },
  selectForInvoice: (id, cb) => {
    const queryString =
      'SELECT rr.res_room_id, (DATE(rr.check_out_date)-DATE(rr.check_in_date)) AS num_days, rr.rate, tr.county_rate, tr.city_rate, tr.state_rate FROM res_rooms AS rr, (SELECT (county_tax_rate/100) AS county_rate, (city_tax_rate/100) AS city_rate, (state_tax_rate/100) AS state_rate FROM tax_rates WHERE tax_rate_id=1 LIMIT 1) AS tr WHERE rr.active=1 && rr.res_room_id=? LIMIT 1;'
    connection.execute(queryString, [id], (err, result) => {
      if (err) throw err
      cb(result)
    })
  },
  selectForPreInvoice: (id, cb) => {
    const queryString =
      'SELECT rr.res_room_id, c.first_name, c.last_name, SUBSTRING(c.credit_card_num, -4) AS ccLastFour, rr.check_in_date, rr.check_out_date, (DATE(rr.check_out_date)-DATE(rr.check_in_date)) AS num_days, rr.rate, tr.county_rate, tr.city_rate, tr.state_rate FROM res_rooms AS rr INNER JOIN reservations AS r ON r.reservation_id=rr.reservation_id INNER JOIN customers AS c ON c.customer_id=r.customer_id, (SELECT (county_tax_rate/100) AS county_rate, (city_tax_rate/100) AS city_rate, (state_tax_rate/100) AS state_rate FROM tax_rates WHERE tax_rate_id=1 LIMIT 1) AS tr WHERE rr.active=1 && rr.res_room_id=? LIMIT 1;'
    connection.execute(queryString, [id], (err, result) => {
      if (err) throw err
      cb(result)
    })
  },
  selectSome: (id, cb) => {
    const queryString =
      "SELECT rr.res_room_id, rr.room_type_id, DATE_FORMAT(rr.check_in_date, '%b %d, %Y') AS check_in_date, DATE_FORMAT(rr.check_out_date, '%b %d, %Y') AS check_out_date, rr.checked_in, rr.checked_out, rr.adults, IFNULL(rm.room_num, 'Not Set') AS room_num, rr.confirmation_code, rr.comments, rt.type, rt.rate FROM res_rooms AS rr INNER JOIN room_types AS rt ON rr.room_type_id=rt.room_type_id LEFT JOIN rooms AS rm ON rm.room_id=rr.room_id WHERE rr.reservation_id=?;"
    connection.execute(queryString, [id], (err, result) => {
      if (err) throw err
      cb(result)
    })
  },
  getGuests: (conditions, cb) => {
    formattedConditions = conditions.join(' && ')
    const queryString =
      "SELECT r.reservation_id, DATE_FORMAT(rr.check_in_date, '%b %d, %Y') AS check_in_date, DATE_FORMAT(rr.check_out_date, '%b %d, %Y') AS check_out_date, rm.room_num, rr.confirmation_code, rr.comments, rt.type, c.first_name, c.last_name FROM res_rooms AS rr INNER JOIN room_types AS rt ON rr.room_type_id=rt.room_type_id INNER JOIN rooms AS rm ON rm.room_id=rr.room_id INNER JOIN reservations AS r ON rr.reservation_id=r.reservation_id INNER JOIN customers AS c ON c.customer_id=r.customer_id WHERE rr.active=1 && rr.checked_in=1 && rr.checked_out=0 && " +
      formattedConditions +
      ' ORDER BY rm.room_num ASC;'
    connection.query(queryString, (err, result) => {
      if (err) throw err
      cb(result)
    })
    // rm.occupied=1 && " + formattedConditions + "
  },
  deleteSome: (id, cb) => {
    const queryString = 'DELETE FROM res_rooms WHERE reservation_id=?;'
    connection.execute(queryString, [id], (err, result) => {
      if (err) throw err
      cb(result)
    })
  },
  insertSome: (id, vals, cb) => {
    const resIdLastThree = id.toString().slice(-3)
    let rrNum
    let endOfCode
    const queryString =
      "INSERT INTO res_rooms (reservation_id, room_type_id, check_in_date, check_out_date, adults, rate, confirmation_code, comments) VALUES (?,?,?,?,?,?,(CONCAT(DATE_FORMAT(CURDATE(), '%y%m%d'), ?)),?);"
    vals.forEach(function (room, i) {
      rrNum = ('00' + (i + 1)).slice(-3)
      endOfCode = resIdLastThree + rrNum
      room.unshift(id)
      room.splice(6, 0, endOfCode)
      connection.execute(queryString, room, (err, result) => {
        if (err) throw err
        cb(result)
      })
    })
  },
  cancelSome: (id, cb) => {
    const queryString = 'UPDATE res_rooms SET active=0 WHERE reservation_id=?;'
    connection.execute(queryString, [id], (err, result) => {
      if (err) throw err
      cb(result)
    })
  },
  updateCheckIn: (vals, cb) => {
    const queryString =
      'UPDATE res_rooms SET checked_in=1, room_id=? WHERE res_room_id=?;'
    connection.execute(queryString, vals, (err, result) => {
      if (err) throw err
      cb(result)
    })
  },
  updateCheckOut: (id, cb) => {
    const queryString =
      'UPDATE res_rooms SET checked_out=1 WHERE res_room_id=?;'
    connection.execute(queryString, [id], (err, result) => {
      if (err) throw err
      cb(result)
    })
  },
  updateSome: (vals, cb) => {
    const queryString =
      'UPDATE res_rooms SET room_type_id=?, check_in_date=?, check_out_date=?, adults=?, rate=?, comments=? WHERE res_room_id=?;'
    vals.forEach(function (room) {
      connection.execute(queryString, room, (err, result) => {
        if (err) throw err
        cb(result)
      })
    })
  }
}

module.exports = ResRoom
