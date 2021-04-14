import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Header from '../../components/header'
import api from '../../utils/api'
import Table from 'react-bootstrap/Table'

class Housekeeping extends Component {
  state = {
    checked: {
      clean: false,
      dirty: false,
      vacant: false,
      occupied: false,
      arrived: false,
      stayOver: false,
      dueOut: false,
      departed: false,
      notReserved: false
    },
    searchResults: []
  }

  makeAxiosCall = () => {
    api
      .getHouseKeepingStatus(this.state.checked)
      .then(res => this.setState({ searchResults: res }))
      .catch(err => console.log(err))
  }

  componentDidMount () {
    this.makeAxiosCall()
  }

  handleCleanChange = event => {
    const { id, value } = event.target
    let searchResults = [...this.state.searchResults]
    searchResults[id].clean = value
    this.setState({ searchResults }, () => {
      api
        .updateCleanStatus(this.state.searchResults[id].room_id, value)
        .then(() => {})
        .catch(err => console.log(err))
    })
  }

  handleCheckboxChange = event => {
    let futureState = this.state.checked
    switch (event.target.id) {
      case 'clean':
        futureState.clean = !this.state.checked.clean
        break
      case 'dirty':
        futureState.dirty = !this.state.checked.dirty
        break
      case 'vacant':
        futureState.vacant = !this.state.checked.vacant
        break
      case 'occupied':
        futureState.occupied = !this.state.checked.occupied
        break
      case 'arrived':
        futureState.arrived = !this.state.checked.arrived
        break
      case 'stay-over':
        futureState.stayOver = !this.state.checked.stayOver
        break
      case 'due-out':
        futureState.dueOut = !this.state.checked.dueOut
        break
      case 'departed':
        futureState.departed = !this.state.checked.departed
        break
      case 'not-reserved':
        futureState.notReserved = !this.state.checked.notReserved
        break
      case 'clear-all':
        futureState.clean = false
        futureState.dirty = false
        futureState.vacant = false
        futureState.occupied = false
        futureState.arrived = false
        futureState.stayOver = false
        futureState.dueOut = false
        futureState.departed = false
        futureState.notReserved = false
        break
      case 'select-all':
        futureState.clean = true
        futureState.dirty = true
        futureState.vacant = true
        futureState.occupied = true
        futureState.arrived = true
        futureState.stayOver = true
        futureState.dueOut = true
        futureState.departed = true
        futureState.notReserved = true
        break
      default:
        break
    }
    this.setState({ checked: futureState }, () => {
      this.makeAxiosCall()
    })
  }

  handleFormSubmit = event => {
    event.preventDefault()
    this.makeAxiosCall()
  }
  printFunction () {
    window.print()
  }

  render () {
    return (
      <>
        <Header>HOUSEKEEPING</Header>
        <Card body>
          <Row className='d-print-none'>
            <Col xl={10}>
              <Row>
                <Col xs={12} sm={3}>
                  <h6>Room Status:</h6>
                </Col>
                <Col xs={6} sm={3} md={2} lg={1}>
                  Clean
                </Col>
                <Col xs={6} sm={1}>
                  <input
                    type='checkbox'
                    id='clean'
                    checked={this.state.checked.clean}
                    onChange={this.handleCheckboxChange}
                  />
                </Col>
                <Col xs={6} sm={3} md={2}>
                  Dirty {this.state.rooms}
                </Col>
                <Col xs={6} sm={1}>
                  <input
                    type='checkbox'
                    id='dirty'
                    checked={this.state.checked.dirty}
                    onChange={this.handleCheckboxChange}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs={12} sm={3}>
                  <h6> Front Office Status: </h6>
                </Col>
                <Col xs={6} sm={3} md={2} lg={1}>
                  Vacant
                </Col>
                <Col xs={6} sm={1}>
                  <input
                    type='checkbox'
                    id='vacant'
                    checked={this.state.checked.vacant}
                    onChange={this.handleCheckboxChange}
                  />
                </Col>
                <Col xs={6} sm={3} md={2}>
                  Occupied
                </Col>
                <Col xs={6} sm={1}>
                  <input
                    type='checkbox'
                    id='occupied'
                    checked={this.state.checked.occupied}
                    onChange={this.handleCheckboxChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={3} md={2} lg={3}>
                  <h6> Reservation Status: </h6>
                </Col>
                <Col xs={6} sm={3} md={2} lg={1}>
                  Arrived
                </Col>
                <Col xs={6} sm={1}>
                  <input
                    type='checkbox'
                    id='arrived'
                    checked={this.state.checked.arrived}
                    onChange={this.handleCheckboxChange}
                  />
                </Col>

                <Col xs={6} sm={3} md={2}>
                  Stay Over
                </Col>
                <Col xs={6} sm={1}>
                  <input
                    type='checkbox'
                    id='stay-over'
                    checked={this.state.checked.stayOver}
                    onChange={this.handleCheckboxChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={3} md={2} lg={3}></Col>
                <Col xs={6} sm={3} md={2} lg={1}>
                  Departed
                </Col>
                <Col xs={6} sm={1}>
                  <input
                    type='checkbox'
                    id='departed'
                    checked={this.state.checked.departed}
                    onChange={this.handleCheckboxChange}
                  />
                </Col>
                <Col xs={6} sm={3} md={2}>
                  Due Out
                </Col>
                <Col xs={6} sm={1}>
                  <input
                    type='checkbox'
                    id='due-out'
                    checked={this.state.checked.dueOut}
                    onChange={this.handleCheckboxChange}
                  />
                </Col>

                <Col xs={6} sm={5} md={2}>
                  Not Reserved
                </Col>
                <Col xs={6} sm={1}>
                  <input
                    type='checkbox'
                    id='not-reserved'
                    checked={this.state.checked.notReserved}
                    onChange={this.handleCheckboxChange}
                  />
                </Col>
              </Row>
            </Col>

            <Col xs={2}>
              <button
                type='button'
                className='btn btn-success'
                id='select-all'
                checked={this.state.checked.selectAll}
                onClick={this.handleCheckboxChange}
              >
                {' '}
                Select All{' '}
              </button>
              <button
                type='button'
                className='btn btn-success'
                id='clear-all'
                checked={this.state.checked.clearAll}
                onClick={this.handleCheckboxChange}
              >
                Clear All{' '}
              </button>
              <button
                type='button'
                className='btn btn-success'
                id='print-button'
                onClick={this.printFunction}
              >
                Print
              </button>
            </Col>
          </Row>

          <Row>
            <Col xl={12}>
              <Table striped bordered variant='light'>
                <tbody>
                  <tr>
                    <th>Room</th>
                    <th>Room Type</th>
                    <th>Room Status</th>
                    <th>Front Office Status</th>
                    <th>Reservation Status</th>
                  </tr>
                  {this.state.searchResults.map((room, i) => (
                    <tr key={room.room_num}>
                      <td>{room.room_num}</td>
                      <td>{room.type}</td>
                      <td>
                        <select
                          id={i}
                          value={room.clean}
                          onChange={this.handleCleanChange}
                        >
                          <option value='1'>Clean</option>
                          <option value='0'>Dirty</option>
                        </select>
                      </td>
                      <td>{room.occupied === 1 ? 'Occupied' : 'Vacant'}</td>
                      <td>
                        {room.checked_out === 1
                          ? 'Departed'
                          : room.departure
                          ? room.departure
                          : room.stayover
                          ? room.stayover
                          : room.checked_in === 1
                          ? 'Arrived'
                          : 'Not Reserved'}
                      </td>
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

export default Housekeeping
