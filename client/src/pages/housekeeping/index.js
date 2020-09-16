import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './style.css'
import Header from '../../components/Header'
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
    let tempState = this.state.checked
    switch (event.target.id) {
      case 'clean':
        tempState.clean = !this.state.checked.clean
        break
      case 'dirty':
        tempState.dirty = !this.state.checked.dirty
        break
      case 'vacant':
        tempState.vacant = !this.state.checked.vacant
        break
      case 'occupied':
        tempState.occupied = !this.state.checked.occupied
        break
      case 'arrived':
        tempState.arrived = !this.state.checked.arrived
        break
      case 'stayOver':
        tempState.stayOver = !this.state.checked.stayOver
        break
      case 'dueOut':
        tempState.dueOut = !this.state.checked.dueOut
        break
      case 'departed':
        tempState.departed = !this.state.checked.departed
        break
      case 'notReserved':
        tempState.notReserved = !this.state.checked.notReserved
        break
      case 'clearAll':
        tempState.clean = false
        tempState.dirty = false
        tempState.vacant = false
        tempState.occupied = false
        tempState.arrived = false
        tempState.stayOver = false
        tempState.dueOut = false
        tempState.departed = false
        tempState.notReserved = false
        break
      case 'selectAll':
        tempState.clean = true
        tempState.dirty = true
        tempState.vacant = true
        tempState.occupied = true
        tempState.arrived = true
        tempState.stayOver = true
        tempState.dueOut = true
        tempState.departed = true
        tempState.notReserved = true
        break
      default:
        break
    }
    this.setState({ checked: tempState }, () => {
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
      <div>
        <Row>
          <Col xl={12}>
            <Header>HOUSEKEEPING</Header>
          </Col>
        </Row>
        <div id='res'>
          <Row>
            <Col xl={10}>
              <Row id='firstRow'>
                <Col xs={12} sm={3} md={2} lg={3} xl={3}>
                  <h6>Room Status:</h6>
                </Col>
                <Col xs={6} sm={3} md={2} lg={1} xl={1}>
                  Clean
                </Col>
                <Col xs={6} sm={1} md={1} lg={1} xl={1}>
                  <input
                    type='checkbox'
                    id='clean'
                    checked={this.state.checked.clean}
                    onChange={this.handleCheckboxChange}
                  />
                </Col>
                <Col xs={6} sm={3} md={2} lg={2} xl={2}>
                  Dirty {this.state.rooms}
                </Col>
                <Col xs={6} sm={1} md={1} lg={1} xl={1}>
                  <input
                    type='checkbox'
                    id='dirty'
                    checked={this.state.checked.dirty}
                    onChange={this.handleCheckboxChange}
                  />
                </Col>
              </Row>

              <Row id='secondRowP'>
                <Col xs={12} sm={3} md={2} lg={3} xl={3}>
                  <h6> Front Office Status: </h6>
                </Col>
                <Col xs={6} sm={3} md={2} lg={1} xl={1}>
                  Vacant
                </Col>
                <Col xs={6} sm={1} md={1} lg={1} xl={1}>
                  <input
                    type='checkbox'
                    id='vacant'
                    checked={this.state.checked.vacant}
                    onChange={this.handleCheckboxChange}
                  />
                </Col>
                <Col xs={6} sm={3} md={2} lg={2} xl={2}>
                  Occupied
                </Col>
                <Col xs={6} sm={1} md={1} lg={1} xl={1}>
                  <input
                    type='checkbox'
                    id='occupied'
                    checked={this.state.checked.occupied}
                    onChange={this.handleCheckboxChange}
                  />
                </Col>
              </Row>
              <Row id='secondRow'>
                <Col xs={12} sm={3} md={2} lg={3} xl={3}>
                  <h6> Reservation Status: </h6>
                </Col>
                <Col xs={6} sm={3} md={2} lg={1} xl={1}>
                  Arrived
                </Col>
                <Col xs={6} sm={1} md={1} lg={1} xl={1}>
                  <input
                    type='checkbox'
                    id='arrived'
                    checked={this.state.checked.arrived}
                    onChange={this.handleCheckboxChange}
                  />
                </Col>

                <Col xs={6} sm={3} md={2} lg={2} xl={2}>
                  Stay Over
                </Col>
                <Col xs={6} sm={1} md={1} lg={1} xl={1}>
                  <input
                    type='checkbox'
                    id='stayOver'
                    checked={this.state.checked.stayOver}
                    onChange={this.handleCheckboxChange}
                  />
                </Col>
              </Row>
              <Row id='secondRow'>
                <Col sm={3} md={2} lg={3} xl={3}></Col>
                <Col xs={6} sm={3} md={2} lg={1} xl={1}>
                  Departed
                </Col>
                <Col xs={6} sm={1} md={1} lg={1} xl={1}>
                  <input
                    type='checkbox'
                    id='departed'
                    checked={this.state.checked.departed}
                    onChange={this.handleCheckboxChange}
                  />
                </Col>
                <Col xs={6} sm={3} md={2} lg={2} xl={2}>
                  Due Out
                </Col>
                <Col xs={6} sm={1} md={1} lg={1} xl={1}>
                  <input
                    type='checkbox'
                    id='dueOut'
                    checked={this.state.checked.dueOut}
                    onChange={this.handleCheckboxChange}
                  />
                </Col>

                <Col xs={6} sm={5} md={2} lg={2} xl={2}>
                  Not Reserved
                </Col>
                <Col xs={6} sm={1} md={1} lg={1} xl={1}>
                  <input
                    type='checkbox'
                    id='notReserved'
                    checked={this.state.checked.notReserved}
                    onChange={this.handleCheckboxChange}
                  />
                </Col>
              </Row>
            </Col>

            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
              <button
                type='button'
                className='btn btn-success'
                id='selectAll'
                checked={this.state.checked.selectAll}
                onClick={this.handleCheckboxChange}
              >
                {' '}
                Select All{' '}
              </button>
              <button
                type='button'
                className='btn btn-success'
                id='clearAll'
                checked={this.state.checked.clearAll}
                onClick={this.handleCheckboxChange}
              >
                Clear All{' '}
              </button>
              <button
                type='button'
                className='btn btn-success'
                id='printButton'
                onClick={this.printFunction}
              >
                Print
              </button>
            </Col>
          </Row>
        </div>
        <div id='res2'>
          <Row id='thirdRow'>
            <Col xl={12}>
              <Table>
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
                          className='p-1'
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
        </div>
      </div>
    )
  }
}

export default Housekeeping
