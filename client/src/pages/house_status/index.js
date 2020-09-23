import React, { Component } from 'react'
import api from '../../utils/api'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import moment from 'moment'
import Header from '../../components/header'
const today = moment().format('YYYY-MM-DD')

class HouseStatus extends Component {
  state = {
    date: today,
    roomsToSell: '',
    minAvailableTonight: '',
    maxOccupiedTonight: '',
    stayovers: '',
    departuresPending: '',
    departuresActual: '',
    arrivalsPending: '',
    arrivalsActual: '',
    cleanVacant: '',
    cleanOccupied: '',
    dirtyVacant: '',
    dirtyOccupied: ''
  }

  makeAxiosCall = () => {
    api
      .getHouseStatus(this.state.date)
      .then(res =>
        this.setState({
          roomsToSell: res.rooms[0].roomsToSell,
          cleanVacant: res.rooms[0].cleanVacant,
          cleanOccupied: res.rooms[0].cleanOccupied,
          dirtyVacant: res.rooms[0].dirtyVacant,
          dirtyOccupied: res.rooms[0].dirtyOccupied,
          stayovers: res.res_rooms[0].stayovers,
          departuresPending: res.res_rooms[0].departuresPending,
          departuresActual: res.res_rooms[0].departuresActual,
          arrivalsPending: res.res_rooms[0].arrivalsPending,
          arrivalsActual: res.res_rooms[0].arrivalsActual,
          minAvailableTonight:
            Number(res.rooms[0].roomsToSell) -
            Number(res.res_rooms[0].stayovers) -
            Number(res.res_rooms[0].arrivalsPending) -
            Number(res.res_rooms[0].arrivalsActual),
          maxOccupiedTonight:
            Number(res.res_rooms[0].stayovers) +
            Number(res.res_rooms[0].arrivalsPending) +
            Number(res.res_rooms[0].arrivalsActual)
        })
      )
      .catch(err => console.log(err))
  }

  componentDidMount () {
    this.makeAxiosCall()
  }

  handleDateChange = event => {
    this.setState({ date: event.target.value }, () => {
      this.makeAxiosCall()
    })
  }

  render () {
    return (
      <div>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Header>HOUSE STATUS</Header>
          </Col>
        </Row>
        <div>
          <Row>
            <Col xs={12} sm={12} md={6} lg={4} xl={4}>
              <Row>Room Summary</Row>
              <Row>
                <Col xs={8} sm={8} md={8} lg={9} xl={9}>
                  Total Rooms to Sell:
                </Col>
                <Col xs={4} sm={4} md={4} lg={3} xl={3}>
                  {this.state.roomsToSell}
                </Col>
              </Row>
              <Row>
                <Col xs={8} sm={8} md={8} lg={9} xl={9}>
                  Min. Available Tonight:
                </Col>
                <Col xs={4} sm={4} md={4} lg={3} xl={3}>
                  {this.state.minAvailableTonight}
                </Col>
              </Row>
              <Row>
                <Col xs={8} sm={8} md={8} lg={9} xl={9}>
                  Max. Occupied Tonight:
                </Col>
                <Col xs={4} sm={4} md={4} lg={3} xl={3}>
                  {this.state.maxOccupiedTonight}
                </Col>
              </Row>
            </Col>
            <Col xs={12} sm={12} md={6} lg={4} xl={4}>
              <Row>Activity</Row>
              <Row>
                <Col xs={8} sm={8} md={8} lg={9} xl={9}>
                  Stayovers:
                </Col>
                <Col xs={4} sm={4} md={4} lg={3} xl={3}>
                  {this.state.stayovers}
                </Col>
              </Row>
              <Row>
                <Col xs={8} sm={8} md={8} lg={9} xl={9}>
                  Departures Pending:{' '}
                </Col>
                <Col xs={4} sm={4} md={4} lg={3} xl={3}>
                  {this.state.departuresPending}
                </Col>
              </Row>
              <Row>
                <Col xs={8} sm={8} md={8} lg={9} xl={9}>
                  Departures Actual:
                </Col>
                <Col xs={4} sm={4} md={4} lg={3} xl={3}>
                  {this.state.departuresActual}
                </Col>
              </Row>
              <Row>
                <Col xs={8} sm={8} md={8} lg={9} xl={9}>
                  Arrivals Pending:
                </Col>
                <Col xs={4} sm={4} md={4} lg={3} xl={3}>
                  {this.state.arrivalsPending}
                </Col>
              </Row>
              <Row>
                <Col xs={8} sm={8} md={8} lg={9} xl={9}>
                  Arrivals Actual:
                </Col>
                <Col xs={4} sm={4} md={4} lg={3} xl={3}>
                  {this.state.arrivalsActual}
                </Col>
              </Row>
            </Col>
            <Col xs={12} sm={12} md={6} lg={4} xl={4}>
              <Row>Room Status-Housekeeping</Row>
              <Row>
                <Col xs={3} sm={3} md={2} lg={4} xl={4}></Col>
                <Col xs={3} sm={3} md={2} lg={4} xl={4}>
                  Vacant
                </Col>
                <Col xs={3} sm={3} md={2} lg={4} xl={4}>
                  Occupied
                </Col>
              </Row>
              <Row>
                <Col xs={3} sm={3} md={2} lg={4} xl={4}>
                  Clean
                </Col>
                <Col xs={3} sm={3} md={2} lg={4} xl={4}>
                  {this.state.cleanVacant}
                </Col>
                <Col xs={3} sm={3} md={2} lg={4} xl={4}>
                  {this.state.cleanOccupied}
                </Col>
              </Row>
              <Row>
                <Col xs={3} sm={3} md={2} lg={4} xl={4}>
                  Dirty
                </Col>
                <Col xs={3} sm={3} md={2} lg={4} xl={4}>
                  {this.state.dirtyVacant}
                </Col>
                <Col xs={3} sm={3} md={2} lg={4} xl={4}>
                  {this.state.dirtyOccupied}
                </Col>
              </Row>
            </Col>
          </Row>
          <div>
            <Row>
              <Col>
                Date:
                <input
                  type='date'
                  name='date'
                  value={this.state.date}
                  onChange={this.handleDateChange}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}
export default HouseStatus
