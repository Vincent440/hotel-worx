import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import api from '../../utils/api'
import Header from '../../components/header'
import DateRange from '../../components/date_range'
import RegistrationForm from '../../components/registration_form'
import moment from 'moment'
import { Card } from 'react-bootstrap'

class NewReservation extends Component {
  constructor () {
    super()
    this.handleFromChange = this.handleFromChange.bind(this)
    this.handleToChange = this.handleToChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  state = {
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    arrivaldate: '',
    departuredate: '',
    nights: '',
    adults: 1,
    numRooms: 1,
    RoomTypes: [],
    roomtype: '',
    rate: '',
    creditCard: '',
    expirationDate: '',
    res_comments: '',
    room_comments: '',
    reservationSuccess: false,
    newReservationId: '',
    errors: {}
  }

  showFromMonth () {
    const { from, to } = this.state
    if (!from) {
      return
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from)
    }
  }

  handleFromChange (arrivaldate) {
    this.setState({ arrivaldate })
  }

  handleToChange (departuredate) {
    this.setState({ departuredate }, this.showFromMonth)
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  validateForm () {
    let errors = {}
    let formIsValid = true

    if (!this.state.firstname) {
      formIsValid = false
      errors['firstname'] = '*Please enter your firstname.'
    }

    if (typeof this.state.firstname !== 'undefined') {
      if (!this.state.firstname.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false
        errors['firstname'] = '*Please enter alphabet characters only.'
      }
    }
    if (!this.state.lastname) {
      formIsValid = false
      errors['lastname'] = '*Please enter your lastname.'
    }

    if (typeof this.state.lastname !== 'undefined') {
      if (!this.state.lastname.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false
        errors['lastname'] = '*Please enter alphabet characters only.'
      }
    }

    if (!this.state.email) {
      formIsValid = false
      errors['email'] = '*Please enter your email-ID.'
    }

    if (typeof this.state.email !== 'undefined') {
      let pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      )
      if (!pattern.test(this.state.email)) {
        formIsValid = false
        errors['email'] = '*Please enter valid email-ID.'
      }
    }

    if (!this.state.phone) {
      formIsValid = false
      errors['phone'] = '*Please enter your mobile no.'
    }

    if (typeof this.state.phone !== 'undefined') {
      if (!this.state.phone.match(/^\d{3}-\d{3}-\d{4}$/)) {
        formIsValid = false
        errors['phone'] = '*Please enter valid mobile no.'
      }
    }

    if (!this.state.creditCard) {
      formIsValid = false
      errors['creditCard'] = '*Please enter credit card no.'
    }

    if (!this.state.expirationDate) {
      formIsValid = false
      errors['expirationDate'] = '*Please enter expiration date.'
    }
    this.setState({
      errors: errors
    })
    return formIsValid
  }
  handleInputChange = event => {
    if (event.target.name === 'roomtype') {
      const roomKey = parseInt(event.target.value) - 1
      this.setState({ rate: this.state.RoomTypes[roomKey].rate })
    }
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }
  componentDidMount () {
    api
      .getRoomTypes()
      .then(res =>
        this.setState({
          RoomTypes: res,
          roomtype: res[0].room_type_id,
          rate: res[0].rate
        })
      )
      .catch(err => console.log(err))
  }
  handleFormSubmit (e) {
    e.preventDefault()
    if (this.validateForm()) {
      this.makeAxiosCall()
    }
  }
  makeAxiosCall = () => {
    const data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      email: this.state.email,
      phone: this.state.phone,
      creditCard: this.state.creditCard,
      expirationDate: this.state.expirationDate,
      departuredate: moment(this.state.departuredate).format('YYYY-MM-DD'),
      arrivaldate: moment(this.state.arrivaldate).format('YYYY-MM-DD'),
      adults: this.state.adults,
      roomtype: this.state.roomtype,
      rate: this.state.rate,
      comments: this.state.room_comments,
      user_id: this.props.user.user_id
    }
    api
      .createReservation(data)
      .then(res =>
        this.setState({
          reservationSuccess: true,
          newReservationId: res.data.reservation_id
        })
      )
      .catch(err => console.log(err))
  }

  render () {
    if (this.state.reservationSuccess) {
      localStorage.setItem('reservation_id', this.state.newReservationId)
      return (
        <Redirect
          to={{
            pathname: '/reservationcomfirmation'
          }}
        />
      )
    }

    return (
      <>
        <Header>NEW RESERVATION</Header>

        <Card body>
          <Row className='justify-content-center'>
            <Col md={8}>
              <DateRange
                handleFromChange={this.handleFromChange}
                handleToChange={this.handleToChange}
                from={this.state.arrivaldate}
                to={this.state.departuredate}
              />
            </Col>
            <Col sm={6} md={4} className='form-group'>
              <label htmlFor='total-nights'>Total nights</label>
              <input
                className='form-control'
                type='number'
                placeholder='Total nights'
                name='nights'
                id='total-nights'
                value={
                  this.state.departuredate &&
                  Math.round(
                    (this.state.departuredate - this.state.arrivaldate) /
                      (1000 * 60 * 60 * 24)
                  )
                }
                readOnly
                onChange={this.handleInputChange}
              />
            </Col>
            <Col sm={6} md={4} className='form-group'>
              <label htmlFor='number-of-rooms'>Rooms</label>
              <input
                className='form-control'
                type='number'
                placeholder='Number of Rooms'
                name='numRooms'
                id='number-of-rooms'
                value={this.state.numRooms}
                readOnly
              />
            </Col>
            <Col sm={6} md={4} className='form-group'>
              <label htmlFor='number-of-adults'>Adults</label>
              <input
                className='form-control'
                type='number'
                name='adults'
                placeholder='Adults'
                id='number-of-adults'
                value={this.state.adults}
                onChange={this.handleInputChange}
              />
            </Col>
            <Col sm={6} md={4} className='form-group'>
              <label htmlFor='room-type'>Room Type</label>
              <select
                className='form-control'
                name='roomtype'
                id='room-type'
                onChange={this.handleInputChange}
              >
                {this.state.RoomTypes.map(type => (
                  <option key={type.room_type_id} value={type.room_type_id}>
                    {type.type} - {type.rate}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
          <RegistrationForm
            handleFormSubmit={this.handleFormSubmit}
            handleChange={this.handleChange}
            firstname={this.state.firstname}
            lastname={this.state.lastname}
            phone={this.state.phone}
            email={this.state.email}
            address={this.state.address}
            city={this.state.city}
            state={this.state.state}
            zip={this.state.zip}
            creditCard={this.state.creditCard}
            expirationDate={this.state.expirationDate}
            comments={this.state.room_comments}
            cvc={this.state.cvc}
            errors={this.state.errors}
          />
        </Card>
      </>
    )
  }
}

export default NewReservation
