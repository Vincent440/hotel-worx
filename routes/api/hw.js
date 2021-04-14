const router = require('express').Router()
const db = require('../../models/index.js')

// ------------- '/api/hw/' --- routes --------
// These routes were originally meant to be temporary and were to be removed once the functionality was completed.
// Before removing a route it must first have a corresponding /api/route without the /hw/ prefix.
// In that route the logic should be moved to a controller file once the functionality is completed.
// ---------------------------------------------

router.get('/customers', (req, res) => {
  db.Customer.selectAll(data => {
    res.json(data)
  })
})

router.get('/customers/:id', (req, res) => {
  db.Customer.selectOne(req.params.id, data => {
    res.json(data)
  })
})

router.delete('/customers/:id', (req, res) => {
  db.Customer.deleteOne(req.params.id, data => {
    res.json(data)
  })
})

// this route will need to be sent data like this: { "vals": ["Joe", "Blow", "222 E Market St", "Akron", "Ohio", "42116", "joeblow@gmail.com", "440-234-1234", "1234567890123456", "11-21", 1] }
router.post('/customers', (req, res) => {
  db.Customer.insertOne(req.body.vals, result => {
    res.json({ id: result.insertId })
  })
})

// this route will need to be sent data like this: { "vals": ["Joe", "Blow", "222 E Market St", "Akron", "Ohio", "42116", "joeblow@gmail.com", "440-234-1234", "1234567890123456", "11-21", 1] }
router.put('/customers/:id', (req, res) => {
  db.Customer.updateOne(req.body.vals, req.params.id, result => {
    if (result.changedRows === 0) {
      res.status(204).end()
    } else {
      res.status(200).end()
    }
  })
})

router.get('/rooms', (req, res) => {
  db.Room.selectAll(data => {
    res.json(data)
  })
})

router.get('/roomsIdNum', (req, res) => {
  db.Room.selectAllIdNum(data => {
    res.json(data)
  })
})

router.get('/rooms/:id', (req, res) => {
  db.Room.selectOne(req.params.id, data => {
    res.json(data)
  })
})

router.get(
  '/housekeeping_status/:clean/:dirty/:vacant/:occupied/:arrived/:stayOver/:dueOut/:departed/:notReserved',
  (req, res) => {
    const conditions = []
    let c1
    if (req.params.clean === 'true' && req.params.dirty === 'false') {
      c1 = 'rm.clean=1'
    } else if (req.params.clean === 'false' && req.params.dirty === 'true') {
      c1 = 'rm.clean=0'
    } else {
      c1 = '(rm.clean=1 || rm.clean=0)'
    }
    conditions.push(c1)
    let c3
    if (req.params.vacant === 'true' && req.params.occupied === 'false') {
      c3 = 'rm.occupied=0'
    } else if (
      req.params.vacant === 'false' &&
      req.params.occupied === 'true'
    ) {
      c3 = 'rm.occupied=1'
    } else {
      c3 = '(rm.occupied=1 || rm.occupied=0)'
    }
    conditions.push(c3)
    const criteria4 = []
    req.params.arrived === 'true' &&
      criteria4.push(
        '(checked_in=1 && check_in_date=CURDATE() && checked_out=0)'
      )
    req.params.departed === 'true' &&
      criteria4.push('check_out_date=CURDATE() && checked_out=1')
    req.params.stayOver === 'true' &&
      criteria4.push('(CURDATE()>check_in_date && CURDATE()<check_out_date)')
    req.params.dueOut === 'true' &&
      criteria4.push('(check_out_date=CURDATE() && checked_out=0)')
    req.params.notReserved === 'true' &&
      criteria4.push(
        '(check_in_date IS NULL || (CURDATE() NOT BETWEEN check_in_date AND check_out_date))'
      )
    if (criteria4.length > 0) {
      const c4 = '(' + criteria4.join(' || ') + ')'
      conditions.push(c4)
    }
    db.Room.housekeepingStatus(conditions, data => {
      res.json(data)
    })
  }
)

router.delete('/rooms/:id', (req, res) => {
  db.Room.deleteOne(req.params.id, data => {
    res.json(data)
  })
})

// this route will need to be sent data like this: { "vals": ["208", 2, "microwave and courtyard view", 2, 1, 0, 1] }
router.post('/rooms', (req, res) => {
  db.Room.insertOne(req.body.vals, result => {
    res.json({ id: result.insertId })
  })
})

// this route will need to be sent data like this: { "vals": ["208", 2, "microwave and courtyard view", 2, 1, 0, 1] }
router.put('/rooms/:id', (req, res) => {
  db.Room.updateOne(req.body.vals, req.params.id, result => {
    if (result.changedRows === 0) {
      res.status(204).end()
    } else {
      res.status(200).end()
    }
  })
})

// { "cust": ["first_name", "last_name", "address", "city", "state", "zip", "email", "phone", "credit_card_num", "cc_expiration"], "reserve": ["user_id", "comments"], "rooms": [["room_type_id", "check_in_date", "check_out_date", "adults", "rate", "comments"]] }
// this route will need to be sent data like this:
// {
// 	"cust": ["Peter", "Pan", "1111 FairyTale Lane", "Fantasyland", "Vermont", "23456", "p.pan@yahoo.net", "555-1212", "1234567890123456", "11 / 21"],
// 	"reserve": [1, ""],
// 	"rooms": [[2, "2019-08-12", "2019-08-15", 2, "119.99", "need a good view"], [1, "2019-08-12", "2019-08-17", 2, "109.99", "want a late checkout"]]
// }
router.post('/reservation', (req, res) => {
  db.Customer.insertOne(req.body.cust, result => {
    db.Reservation.insertOne(result.insertId, req.body.reserve, result => {
      const reservationId = result.insertId
      db.ResRoom.insertSome(result.insertId, req.body.rooms, () => {
        res.status(200).send({ reservation_id: reservationId })
      })
    })
  })
})

router.put('/reservation', (req, res) => {
  db.Customer.updateOne(req.body.cust, () => {
    db.Reservation.updateOne(req.body.reserve, () => {
      db.ResRoom.updateSome(req.body.rooms, result => {
        res.status(200).send(result)
      })
    })
  })
})

router.get('/reservations', (req, res) => {
  db.Reservation.selectAll(data => {
    res.json(data)
  })
})

router.get(
  '/reservations_list/:fname/:lname/:sdate/:edate/:cnum',
  (req, res) => {
    const conditions = []
    req.params.fname !== 'undefined' &&
      conditions.push("c.first_name LIKE '" + req.params.fname + "%'")
    req.params.lname !== 'undefined' &&
      conditions.push("c.last_name LIKE '" + req.params.lname + "%'")
    req.params.sdate !== 'undefined' &&
      conditions.push("(rr.check_in_date='" + req.params.sdate + "')")
    req.params.edate !== 'undefined' &&
      conditions.push("(rr.check_out_date='" + req.params.edate + "')")
    req.params.cnum !== 'undefined' &&
      conditions.push("rr.confirmation_code LIKE '%" + req.params.cnum + "%'")
    conditions.length === 0 && conditions.push('(rr.check_in_date>=CURDATE())')
    db.Reservation.selectSome(conditions, data => {
      res.json(data)
    })
  }
)

// to get info about a reservation, both of these 2 queries need to be returned
// this route gets a reservation by id with customer info
router.get('/reservation/:id', (req, res) => {
  db.Reservation.selectOne(req.params.id, result => {
    res.json(result)
  })
})
// this route gets all rooms associated with a reservation_id
router.get('/res_rooms/:id', (req, res) => {
  db.ResRoom.selectSome(req.params.id, result => {
    res.json(result)
  })
})

router.get('/arrivals/:sdate/:fname/:lname/:cnum', (req, res) => {
  const conditions = []
  if (req.params.sdate !== 'undefined') {
    conditions.push("(rr.check_in_date='" + req.params.sdate + "')")
  }
  if (req.params.fname !== 'undefined') {
    conditions.push("c.first_name LIKE '" + req.params.fname + "%'")
  }
  if (req.params.lname !== 'undefined') {
    conditions.push("c.last_name LIKE '" + req.params.lname + "%'")
  }
  if (req.params.cnum !== 'undefined') {
    conditions.push("rr.confirmation_code LIKE '%" + req.params.cnum + "%'")
  }
  conditions.length === 0
    ? conditions.push('(rr.check_in_date=CURDATE())')
    : conditions
  db.ResRoom.selectArrivals(conditions, result => {
    res.json(result)
  })
})

router.get(
  '/departures/:fname/:lname/:rnum/:sover/:dout/:dpart',
  (req, res) => {
    const conditions = []
    req.params.fname !== 'undefined' &&
      conditions.push("c.first_name LIKE '" + req.params.fname + "%'")
    req.params.lname !== 'undefined' &&
      conditions.push("c.last_name LIKE '" + req.params.lname + "%'")
    req.params.rnum !== 'undefined' &&
      conditions.push("(rm.room_num='" + req.params.rnum + "')")
    req.params.sover === 'true' &&
      conditions.push(
        '(rr.check_in_date<CURDATE() && rr.check_out_date>CURDATE())'
      )
    req.params.dout === 'true' &&
      conditions.push('(rr.check_out_date=CURDATE() && rr.checked_out=0)')
    req.params.dpart === 'true' &&
      conditions.push('(rr.check_out_date=CURDATE() && rr.checked_out=1)')
    conditions.length === 0 &&
      conditions.push('(rr.check_out_date=CURDATE() && rr.checked_out=0)')
    db.ResRoom.selectDepartures(conditions, result => {
      res.json(result)
    })
  }
)

router.get('/rooms_arrivals/:date', (req, res) => {
  db.Room.selectAllShort(req.params.date, result => {
    res.json(result)
  })
})

router.get('/pending_departures/:date', (req, res) => {
  db.ResRoom.countPendingDeparturesByRoomType(req.params.date, result => {
    res.json(result)
  })
})

router.get('/guests/:fname/:lname/:rnum/:cnum', (req, res) => {
  const conditions = []
  if (req.params.fname !== 'undefined') {
    conditions.push("c.first_name LIKE '" + req.params.fname + "%'")
  }
  if (req.params.lname !== 'undefined') {
    conditions.push("c.last_name LIKE '" + req.params.lname + "%'")
  }
  if (req.params.rnum !== 'undefined') {
    conditions.push("rm.room_num LIKE '%" + req.params.rnum + "%'")
  }
  if (req.params.cnum !== 'undefined') {
    conditions.push("rr.confirmation_code LIKE '%" + req.params.cnum + "%'")
  }
  conditions.length === 0 ? conditions.push('(rm.occupied=1)') : conditions
  db.ResRoom.getGuests(conditions, result => {
    res.json(result)
  })
})

// this route will need to be sent data like this: { "vals": [[2, "2019-08-12", "2019-08-15", 2, "20190621HW000001", "need a good view"]] }
router.post('/res_rooms', (req, res) => {
  db.ResRoom.insertSome(req.body.vals, result => {
    res.json({ result })
  })
})

router.put('/cancelReservation/:id', (req, res) => {
  db.Reservation.cancelOne(req.params.id, () => {
    db.ResRoom.cancelSome(req.params.id, data => {
      res.json(data)
    })
  })
})

router.put('/checkinRoom/:id/:room_id', (req, res) => {
  const vals = [req.params.room_id, req.params.id]
  const cond = [1, req.params.room_id]
  db.ResRoom.updateCheckIn(vals, () => {
    db.Room.updateOccupied(cond, result => {
      res.json(result)
    })
  })
})

router.put('/checkoutRoom/:id/:room_num', (req, res) => {
  db.ResRoom.updateCheckOut(req.params.id, () => {
    db.Room.updateCheckOut(req.params.room_num, result => {
      res.json(result)
    })
  })
})

router.post('/invoice', (req, res) => {
  db.ResRoom.selectForInvoice(req.body.id, result => {
    const room_total = (
      parseFloat(result[0].rate) * parseFloat(result[0].num_days)
    ).toFixed(2)
    const county_tax = parseFloat(result[0].county_rate * room_total).toFixed(2)
    const city_tax = parseFloat(result[0].city_rate * room_total).toFixed(2)
    const state_tax = parseFloat(result[0].state_rate * room_total).toFixed(2)
    const payment_type = req.body.payment_type
    const vals = [
      result[0].res_room_id,
      result[0].num_days,
      result[0].rate,
      county_tax,
      city_tax,
      state_tax,
      payment_type
    ]
    db.Invoice.insertOne(vals, result => {
      res.json(result.insertId)
    })
  })
})

router.get('/pre_invoice/:id', (req, res) => {
  db.ResRoom.selectForPreInvoice(req.params.id, result => {
    const room_total = (
      parseFloat(result[0].rate) * parseFloat(result[0].num_days)
    ).toFixed(2)
    const county_tax = parseFloat(result[0].county_rate * room_total).toFixed(2)
    const city_tax = parseFloat(result[0].city_rate * room_total).toFixed(2)
    const state_tax = parseFloat(result[0].state_rate * room_total).toFixed(2)
    const pre_invoice = [
      {
        first_name: result[0].first_name,
        last_name: result[0].last_name,
        ccLastFour: result[0].ccLastFour,
        check_in_date: result[0].check_in_date,
        check_out_date: result[0].check_out_date,
        res_room_id: result[0].res_room_id,
        num_days: result[0].num_days,
        rate: result[0].rate,
        county_tax: county_tax,
        city_tax: city_tax,
        state_tax: state_tax,
        payment_type: ''
      }
    ]
    res.json(pre_invoice)
  })
})

router.get('/invoice/:id', (req, res) => {
  db.Invoice.selectOne(req.params.id, data => {
    res.json(data)
  })
})

router.get('/invoice_id/:id', (req, res) => {
  db.Invoice.selectOneId(req.params.id, data => {
    res.json(data)
  })
})

router.put('/updateCleanStatus/:status/:room_id', (req, res) => {
  const cond = [req.params.status, req.params.room_id]
  db.Room.updateClean(cond, result => {
    res.json(result)
  })
})

router.get('/tax_rates', (req, res) => {
  db.TaxRate.selectRates(data => {
    res.json(data)
  })
})

router.get('/hotel_info/:id', (req, res) => {
  db.HotelInfo.selectOne(req.params.id, data => {
    res.json(data)
  })
})

router.get('/room_issues', (req, res) => {
  db.RoomIssue.selectAll(data => {
    res.json(data)
  })
})

router.put('/room_issues/:id', (req, res) => {
  db.RoomIssue.updateOne(req.body.vals, req.params.id, result => {
    if (result.changedRows === 0) {
      res.status(204).end()
    } else {
      res.status(200).end()
    }
  })
})

router.put('/room_issues_fixed/:id', (req, res) => {
  db.RoomIssue.updateOneFixed(req.params.id, result => {
    if (result.changedRows === 0) {
      res.status(204).end()
    } else {
      res.status(200).end()
    }
  })
})

router.post('/room_issues', (req, res) => {
  db.RoomIssue.insertOne(req.body.vals, result => {
    res.json({ id: result.insertId })
  })
})

router.get('/house_status_res_rooms/:date', (req, res) => {
  db.ResRoom.selectForHouseStatus(req.params.date, data => {
    res.json(data)
  })
})

router.get('/house_status_rooms', (req, res) => {
  db.Room.selectForHouseStatus(data => {
    res.json(data)
  })
})

module.exports = router
