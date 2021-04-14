import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import api from '../../utils/api'
import Header from '../../components/header'

const today = moment().format('YYYY-MM-DD')

class Arrivals extends Component {
  state = {
    startDateRange: today,
    firstname: '',
    lastname: '',
    confirmationNumber: '',
    arrivalsArray: [],
    roomsArray: [],
    pendingArray: []
  }

  makeAxiosCall = () => {
    const criteria = {
      startDateRange: moment(this.state.startDateRange).format('YYYY-MM-DD'),
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      confirmationNumber: this.state.confirmationNumber
    }

    api
      .getArrivalsNew(
        criteria,
        moment(this.state.startDateRange).format('YYYY-MM-DD')
      )
      .then(res =>
        this.setState({
          arrivalsArray: res.arrivals,
          roomsArray: res.rooms_arrivals,
          pendingArray: res.pending_departures
        })
      )
      .catch(err => console.log(err))
  }

  handleCheckIn = (id, room_id) => {
    api
      .updateRoomCheckin(id, room_id)
      .then(res => this.makeAxiosCall())
      .catch(err => console.log(err))
  }

  componentDidMount () {
    this.makeAxiosCall()
  }

  handleInputChange = event => {
    const { name, value } = event.target

    if (name === 'startDateRange' && value === '') {
      return console.log('Must enter a valid date')
    }

    this.setState({ [name]: value }, () => {
      this.makeAxiosCall()
    })
  }

  handleRoomChange = event => {
    const { id, value } = event.target
    console.log(id, value)
    let arrivalsArray = [...this.state.arrivalsArray]
    arrivalsArray[id].selectedRoom = value
    this.setState({ arrivalsArray })
  }

  printFunction () {
    window.print()
  }

  render () {
    return (
      <>
        <Header>ARRIVALS</Header>
        <Card>
          <Card.Header>
            <Row>
              <Col xs={6} sm={3} md={3} lg={2} xl={1}>
                Date
              </Col>
              <Col xs={6} sm={9} md={9} lg={10} xl={2}>
                <input
                  required
                  className='form-control'
                  type='date'
                  placeholder='Date'
                  name='startDateRange'
                  value={this.state.startDateRange}
                  onChange={this.handleInputChange}
                />
              </Col>
              <Col xs={6} sm={3} md={3} lg={2} xl={1}>
                Name
              </Col>
              <Col xs={6} sm={9} md={9} lg={10} xl={2}>
                <input
                  type='text'
                  className='form-control'
                  placeholder='First Name'
                  name='firstname'
                  value={this.state.firstname}
                  onChange={this.handleInputChange}
                />
              </Col>
              <Col xs={6} sm={3} md={3} lg={2} xl={2}>
                Last Name
              </Col>
              <Col xs={6} sm={9} md={9} lg={10} xl={2}>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Last Name'
                  name='lastname'
                  value={this.state.lastname}
                  onChange={this.handleInputChange}
                />
              </Col>
              <Col xs={2} sm={3} md={2} lg={2} xl={1}>
                <button
                  type='button'
                  className='btn btn-lg btn-success'
                  onClick={this.printFunction}
                >
                  Print
                </button>
              </Col>
            </Row>
          </Card.Header>
        </Card>
        <Card>
          <Row>
            <Col xl={12}>
              <Card.Body className='text-center font-weight-bold'>
                <Link
                  className='text-decoration-none'
                  to='../../cashiering/billing'
                >
                  Pending departures
                </Link>{' '}
                by room type:
                {this.state.pendingArray.length === 0
                  ? ' None'
                  : this.state.pendingArray.map((type, i) => (
                      <span key={type.room_type_id}>
                        {i > 0 ? ', ' : ' '}({type.type}:{' '}
                        {type.pending_departures})
                      </span>
                    ))}
              </Card.Body>
            </Col>
          </Row>
        </Card>

        <Row>
          <Col xl={12}>
            <Table striped bordered variant='light'>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Arrival Date</th>
                  <th>Departure Date</th>
                  <th>Room Type</th>
                  <th>Room Number</th>
                  <th></th>
                </tr>
                {this.state.arrivalsArray.map((arrival, i) => (
                  <tr key={arrival.res_room_id}>
                    <td>{arrival.name}</td>
                    <td>{arrival.check_in_date}</td>
                    <td>{arrival.check_out_date}</td>
                    <td>{arrival.type}</td>
                    <td>
                      {this.state.startDateRange === today ? (
                        arrival.room_num === 'Not Set' ? (
                          <select
                            id={i}
                            onChange={this.handleRoomChange}
                            className='p-1'
                          >
                            <option value=''>Select a room</option>
                            {this.state.roomsArray
                              .filter(
                                roomtype =>
                                  roomtype.room_type_id ===
                                    arrival.room_type_id &&
                                  roomtype.occupied === 0
                              )
                              .map(room => (
                                <option key={room.room_id} value={room.room_id}>
                                  {room.room_num}{' '}
                                  {room.clean === 0 && ' (dirty)'}
                                </option>
                              ))}
                          </select>
                        ) : (
                          arrival.room_num
                        )
                      ) : (
                        'Not Set'
                      )}
                    </td>
                    <td>
                      {this.state.startDateRange === today &&
                        (arrival.checked_in === 0 ? (
                          <button
                            onClick={() =>
                              this.handleCheckIn(
                                arrival.res_room_id,
                                this.state.arrivalsArray[i].selectedRoom
                              )
                            }
                          >
                            Check In
                          </button>
                        ) : (
                          'Checked In'
                        ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </>
    )
  }
}

export default Arrivals
