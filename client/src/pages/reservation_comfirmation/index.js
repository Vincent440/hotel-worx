import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import api from '../../utils/api'
import Header from '../../components/header'
import { Redirect } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

class ReservationComfirmation extends Component {
  state = {
    ReservationInfo: {},
    RoomInfo: [],
    reservation_id: '',
    reservationChosen: false
  }

  componentDidMount () {
    let reservation_id = ''
    if (localStorage && localStorage.getItem('reservation_id')) {
      reservation_id = JSON.parse(localStorage.getItem('reservation_id'))
    }
    this.setState({ reservation_id: reservation_id }, () => {
      api
        .getReservation(this.state.reservation_id)
        .then(res =>
          this.setState({
            ReservationInfo: res.resCust[0],
            RoomInfo: res.resRooms
          })
        )
        .catch(err => console.log(err))
    })
  }

  handleChosenReservation = id => {
    this.setState({ reservationChosen: true })
  }

  printFunction () {
    window.print()
  }

  render () {
    if (this.state.reservationChosen) {
      localStorage.setItem('reservation_id', this.state.reservation_id)
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
        <Header>RESERVATION CONFIRMATION</Header>
        <Row>
          <Col xl={12}>
            <Card body>
              <Row>
                <Col xl={3}></Col>
                <Col xl={5}>
                  <strong>Name: </strong>
                  {this.state.ReservationInfo.first_name}{' '}
                  {this.state.ReservationInfo.last_name}
                </Col>
              </Row>
              <Row>
                <Col xl={3}></Col>
                <Col xl={5}>
                  <strong>Address: </strong>
                  {this.state.ReservationInfo.address},{' '}
                  {this.state.ReservationInfo.city},{' '}
                  {this.state.ReservationInfo.state},{' '}
                  {this.state.ReservationInfo.zip}
                </Col>
              </Row>
              <Row>
                <Col xl={3}></Col>
                <Col xl={3}>
                  <strong>Email: </strong> {this.state.ReservationInfo.email}
                </Col>
                <Col xl={4}>
                  <strong>Phone: </strong> {this.state.ReservationInfo.phone}
                </Col>
              </Row>
              <Row>
                <Col xl={3}></Col>
                <Col xl={3}>
                  <strong>Credit Card Number: </strong>****
                  {this.state.ReservationInfo.ccLastFour}
                </Col>
                <Col xl={4}>
                  <strong>Exp Date: </strong>
                  {this.state.ReservationInfo.cc_expiration}
                </Col>
              </Row>
              <hr />
              <Row>
                <Col xl={3}></Col>
                {this.state.RoomInfo.map(room => (
                  <div key={room.res_room_id}>
                    <ul>
                      <li>
                        <strong>Confirmation Number: </strong>
                        {room.confirmation_code}
                      </li>
                      <li>
                        <strong>Arrival Date: </strong>
                        {room.check_in_date}
                      </li>
                      <li>
                        <strong>Departure Date: </strong>
                        {room.check_out_date}
                      </li>
                      <li>
                        <strong>Adults: </strong>
                        {room.adults}
                      </li>
                      <li>
                        <strong>Rate: </strong>
                        {room.rate}
                      </li>
                      <li>
                        <strong>Room Type: </strong>
                        {room.type}
                      </li>
                      <li>
                        <strong>Comments: </strong>
                        {room.comments}
                      </li>
                    </ul>
                  </div>
                ))}
              </Row>

              <Row>
                <Col xl={2}>
                  Made by User ID: {this.state.ReservationInfo.user_id}
                </Col>
                <Col xl={3}>
                  Created On: {this.state.ReservationInfo.created_at}
                </Col>
              </Row>
              <Card.Footer>
                <button
                  type='submit'
                  className='btn btn-primary'
                  onClick={() =>
                    this.handleChosenReservation(this.state.reservation_id)
                  }
                >
                  Change
                </button>
                <button
                  type='submit'
                  className='btn btn-primary ml-3'
                  onClick={this.printFunction}
                >
                  Print
                </button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}
export default ReservationComfirmation
