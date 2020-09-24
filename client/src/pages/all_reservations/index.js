import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Header from '../../components/header'
import SearchButton from '../../components/search_button'
import DateRange from '../../components/date_range/date_range_update'
import Table from 'react-bootstrap/Table'
import api from '../../utils/api'
import moment from 'moment'
import Card from 'react-bootstrap/Card'

class AllReservations extends Component {
  // Setting the initial values of this.state.username and this.state.password
  constructor () {
    super()
    this.handleFromChange = this.handleFromChange.bind(this)
    this.handleToChange = this.handleToChange.bind(this)
  }
  state = {
    firstname: '',
    lastname: '',
    sdate: '',
    edate: '',
    confirmationNumber: '',
    resRooms: [],
    reservationChosen: false,
    chosenReservationId: ''
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
  handleFromChange (sdate) {
    this.setState({ sdate })
  }
  handleToChange (edate) {
    this.setState({ edate }, this.showFromMonth)
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  makeAxiosCall = () => {
    const criteria = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      sdate:
        this.state.sdate === ''
          ? ''
          : moment(this.state.sdate).format('YYYY-MM-DD'),
      edate:
        this.state.edate === ''
          ? ''
          : moment(this.state.edate).format('YYYY-MM-DD'),
      confirmationNumber: this.state.confirmationNumber
    }
    api
      .getSomeReservations(criteria)
      .then(res => this.setState({ resRooms: res }))
      .catch(err => console.log(err))
  }
  handleFormSubmit = event => {
    event.preventDefault()
    this.makeAxiosCall()
  }

  handleChosenReservation = id => {
    this.setState({ reservationChosen: true, chosenReservationId: id })
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  render () {
    if (this.state.reservationChosen) {
      localStorage.setItem('reservation_id', this.state.chosenReservationId)
      return (
        <Redirect
          to={{
            pathname: '/reserve/updatereservation'
          }}
        />
      )
    }

    return (
      <>
        <Header>ALL RESERVATIONS</Header>
        <Card body>
          <Row>
            <Col xs={3} sm={4} md={2} lg={2} xl={1}>
              Arrival
            </Col>
            <Col xs={9} sm={8} md={10} lg={10} xl={5}>
              <DateRange
                handleFromChange={this.handleFromChange}
                handleToChange={this.handleToChange}
                sdate={this.state.sdate}
                edate={this.state.edate}
              />
            </Col>
            <Col xs={6} sm={4} md={2} lg={2} xl={1}>
              Confirmation
            </Col>
            <Col xs={6} sm={8} md={6} lg={6} xl={2}>
              <input
                type='tel'
                placeholder='Confirmation No'
                name='confirmationNumber'
                value={this.state.confirmationNumber}
                onChange={this.handleInputChange}
              />
            </Col>
          </Row>

          <Row>
            <Col xs={6} sm={4} md={2} lg={2} xl={1}>
              Last Name
            </Col>
            <Col xs={6} sm={8} md={4} lg={10} xl={2}>
              <input
                type='text'
                placeholder='Last Name'
                name='lastname'
                value={this.state.lastname}
                onChange={this.handleInputChange}
              />
            </Col>
            <Col xs={6} sm={4} md={2} lg={2} xl={1}>
              First Name
            </Col>
            <Col xs={6} sm={8} md={4} lg={2} xl={6}>
              <input
                type='text'
                placeholder='First Name'
                name='firstname'
                value={this.state.firstname}
                onChange={this.handleInputChange}
              />
            </Col>
            <Col xs={6} sm={6} md={2} lg={12} xl={1}>
              <SearchButton handleFormSubmit={this.handleFormSubmit} />
            </Col>
          </Row>

          <Row>
            <Col xl={12}>
              <Table striped bordered hover variant='light'>
                <tbody>
                  <tr>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Arrival Date</th>
                    <th>Departure Date</th>
                    <th>Room Type</th>
                    <th>Status</th>
                  </tr>

                  {this.state.resRooms.map(res => (
                    <tr
                      key={res.res_room_id}
                      onClick={() =>
                        this.handleChosenReservation(res.reservation_id)
                      }
                    >
                      <td>{res.last_name}</td>
                      <td>{res.first_name}</td>
                      <td>{res.check_in_date}</td>
                      <td>{res.check_out_date}</td>
                      <td>{res.type}</td>
                      <td>{res.active === 1 ? 'Active' : 'Cancelled'}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Card>
      </>
    )
  }
}

export default AllReservations
