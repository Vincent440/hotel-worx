import axios from 'axios'

export default {
  getReservation: id => axios
    .all([
      axios.get('/api/hw/reservation/' + id),
      axios.get('/api/hw/res_rooms/' + id)
    ])
    .then(
      axios.spread((resCust, resRooms) => ({ resCust: resCust.data, resRooms: resRooms.data }))
    ),
  createReservation: data => {
    const fccNum = data.creditCard.replace(/ /g, '')
    return axios
      .post('/api/hw/reservation', {
        cust: [
          data.firstname,
          data.lastname,
          data.address,
          data.city,
          data.state,
          data.zip,
          data.email,
          data.phone,
          fccNum,
          data.expirationDate
        ],
        reserve: [data.user_id, ''],
        rooms: [
          [
            data.roomtype,
            data.arrivaldate,
            data.departuredate,
            data.adults,
            data.rate,
            data.comments
          ]
        ]
      })
      .then(response => response)
      .catch(error => {
        console.log(error)
      })
  },
  updateReservation: data => {
    const fccNum = data.creditCard.replace(/ /g, '')
    return axios
      .put('/api/hw/reservation', {
        cust: [
          data.firstname,
          data.lastname,
          data.address,
          data.city,
          data.state,
          data.zip,
          data.email,
          data.phone,
          fccNum,
          data.expirationDate,
          data.customerId
        ],
        reserve: [data.user_id, '', data.reservation_id],
        rooms: [
          [
            data.roomtype,
            data.arrivaldate,
            data.departuredate,
            data.adults,
            data.rate,
            data.comments,
            data.resRoomId
          ]
        ]
      })
      .then(response => response)
      .catch(error => {
        console.log(error)
      })
  },
  cancelReservation: id => axios
    .put(`/api/hw/cancelReservation/${id}`)
    .then(response => response)
    .catch(error => {
      console.log(error)
    }),
  getReservations: () => axios
    .get('/api/hw/reservations')
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    }),
  getSomeReservations: criteria => {
    const fname = criteria.firstname === '' ? 'undefined' : criteria.firstname
    const lname = criteria.lastname === '' ? 'undefined' : criteria.lastname
    const sdate = criteria.sdate === '' ? 'undefined' : criteria.sdate
    const edate = criteria.edate === '' ? 'undefined' : criteria.edate
    const cnum =
      criteria.confirmationNumber === ''
        ? 'undefined'
        : criteria.confirmationNumber
    return axios
      .get(
        `/api/hw/reservations_list/${fname}/${lname}/${sdate}/${edate}/${cnum}`
      )
      .then(response => response.data)
      .catch(error => {
        console.log(error)
      })
  },
  getRoomTypes: () => axios
    .get('/api/hw/room_types')
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    }),
  getArrivalsNew: (criteria, date) => {
    const sdate =
      criteria.startDateRange === '' ? 'undefined' : criteria.startDateRange
    const fname = criteria.firstname === '' ? 'undefined' : criteria.firstname
    const lname = criteria.lastname === '' ? 'undefined' : criteria.lastname
    const cnum =
      criteria.confirmationNumber === ''
        ? 'undefined'
        : criteria.confirmationNumber
    return axios
      .all([
        axios.get(`/api/hw/arrivals/${sdate}/${fname}/${lname}/${cnum}`),
        axios.get(`/api/hw/rooms_arrivals/${date}`),
        axios.get(`/api/hw/pending_departures/${date}`)
      ])
      .then(
        axios.spread((arrivals, rooms_arrivals, pending_departures) => ({
          arrivals: arrivals.data,
          rooms_arrivals: rooms_arrivals.data,
          pending_departures: pending_departures.data
        }))
      )
  },
  getArrivals: criteria => {
    const sdate =
      criteria.startDateRange === '' ? 'undefined' : criteria.startDateRange
    const fname = criteria.firstname === '' ? 'undefined' : criteria.firstname
    const lname = criteria.lastname === '' ? 'undefined' : criteria.lastname
    const cnum =
      criteria.confirmationNumber === ''
        ? 'undefined'
        : criteria.confirmationNumber
    return axios
      .get(`/api/hw/arrivals/${sdate}/${fname}/${lname}/${cnum}`)
      .then(response => response.data)
      .catch(error => {
        console.log(error)
      })
  },
  getRoomsArrivals: date =>
    axios
      .get(`/api/hw/rooms_arrivals/${date}`)
      .then(response => response.data)
      .catch(error => console.log(error)),
  getDepartures: criteria => {
    const fname = criteria.firstname === '' ? 'undefined' : criteria.firstname
    const lname = criteria.lastname === '' ? 'undefined' : criteria.lastname
    const rnum = criteria.roomNumber === '' ? 'undefined' : criteria.roomNumber
    const sover = criteria.stayOver
    const dout = criteria.dueOut
    const dpart = criteria.checkedOut
    return axios
      .get(
        `/api/hw/departures/${fname}/${lname}/${rnum}/${sover}/${dout}/${dpart}`
      )
      .then(response => response.data)
      .catch(error => {
        console.log(error)
      })
  },
  getGuests: criteria => {
    const fname = criteria.firstname === '' ? 'undefined' : criteria.firstname
    const lname = criteria.lastname === '' ? 'undefined' : criteria.lastname
    const rnum = criteria.roomNumber === '' ? 'undefined' : criteria.roomNumber
    const cnum =
      criteria.confirmationNumber === ''
        ? 'undefined'
        : criteria.confirmationNumber
    return axios
      .get(`/api/hw/guests/${fname}/${lname}/${rnum}/${cnum}`)
      .then(response => response.data)
      .catch(error => {
        console.log(error)
      })
  },
  updateRoomCheckin: (id, room_id) =>
    axios
      .put(`/api/hw/checkinRoom/${id}/${room_id}`)
      .then(response => response)
      .catch(error => {
        console.log(error)
      }),
  updateRoomCheckout: (id, room_num, payment_type) =>
    axios
      .all([
        axios.put(`/api/hw/checkoutRoom/${id}/${room_num}`),
        axios.post('/api/hw/invoice', { id: id, payment_type: payment_type })
      ])
      .then(
        axios.spread((res1, res2) => [res1, res2])
      ),
  getPreInvoice: id => axios
    .get(`/api/hw/pre_invoice/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    }),
  getInvoice: id => axios
    .get(`/api/hw/invoice/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    }),
  getInvoiceId: id => axios
    .get(`/api/hw/invoice_id/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    }),
  updateCleanStatus: (room_id, status) => axios
    .put(`/api/hw/updateCleanStatus/${status}/${room_id}`)
    .then(response => response)
    .catch(error => {
      console.log(error)
    }),
  getAvailableRooms: date => axios
    .all([
      axios.get('/api/hw/room_types'),
      axios.get(`/api/hw/room_types_available/${date}`)
    ])
    .then(
      axios.spread((roomTypes, typeData) => ({ roomTypes: roomTypes.data, typeData: typeData.data[1] }))
    ),
  getHouseKeepingStatus: checked => axios
    .get(
      `/api/hw/housekeeping_status/${checked.clean}/${checked.dirty}/${checked.vacant}/${checked.occupied}/${checked.arrived}/${checked.stayOver}/${checked.dueOut}/${checked.departed}/${checked.notReserved}`
    )
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    }),
  getTaxRates: () => axios
    .get('/api/hw/tax_rates')
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    }),
  getHotelInfo: id => axios
    .get(`/api/hw/hotel_info/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    }),
  getRoomsIdNum: () => axios
    .get('/api/hw/roomsIdNum')
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    }),
  getRoomIssues: () => axios
    .get('/api/hw/room_issues')
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    }),
  updateRoomIssues: (id, vals) => axios
    .put(`/api/hw/room_issues/${id}`, { vals })
    .then(response => response)
    .catch(error => {
      console.log(error)
    }),
  updateRoomIssuesFixed: id => axios
    .put(`/api/hw/room_issues_fixed/${id}`)
    .then(response => response)
    .catch(error => {
      console.log(error)
    }),
  createRoomIssue: vals => axios
    .post('/api/hw/room_issues', { vals })
    .then(response => response)
    .catch(error => {
      console.log(error)
    }),
  getHouseStatus: date => axios
    .all([
      axios.get('/api/hw/house_status_rooms'),
      axios.get(`/api/hw/house_status_res_rooms/${date}`)
    ])
    .then(
      axios.spread((rooms, res_rooms) => ({ rooms: rooms.data, res_rooms: res_rooms.data }))
    )
}
