import React, { Component } from 'react'
import moment from 'moment'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'

import api from '../../utils/api'
import DetailedSubmit from '../../components/detailed_submit'
import Header from '../../components/header'

const today = moment().format('YYYY-MM-DD')
class DetailedAvailability extends Component {
  state = {
    selectedDate: today,
    nights: '',
    noOfRooms: '',
    roomType: '',
    occupied: '',
    availableRooms: [],
    roomTypes: [],
    availableChecked: true,
    occupiedChecked: false
  }

  componentDidMount () {
    this.makeAxiosCall()
  }

  makeAxiosCall = () => {
    api
      .getAvailableRooms(this.state.selectedDate)
      .then(res =>
        this.setState({
          roomTypes: res.roomTypes,
          availableRooms: res.typeData
        })
      )
      .catch(err => console.log(err))
  }

  handleStartDate = event => {
    this.setState({ selectedDate: event.target.value }, () => {
      this.makeAxiosCall()
    })
  }

  handleCheckbox = event => {
    event.target.value === 'available'
      ? this.setState({ availableChecked: true, occupiedChecked: false })
      : this.setState({ availableChecked: false, occupiedChecked: true })
  }

  render () {
    return (
      <>
        <Header>DETAILED AVAILABILITY</Header>
        <Card body>
          <Row>
            <Col xl={12}>
              <Card.Body>
                <DetailedSubmit
                  availableChecked={this.state.availableChecked}
                  occupiedChecked={this.state.occupiedChecked}
                  handleCheckbox={this.handleCheckbox}
                  handleStartDate={this.handleStartDate}
                />
              </Card.Body>
            </Col>
          </Row>
          <Row>
            <Col xl={12}>
              <Card.Body>
                <Table striped bordered variant='light'>
                  <tbody>
                    <tr>
                      <th>Date</th>
                      {this.state.roomTypes.map(type => (
                        <th key={type.room_type_id}>{type.type}</th>
                      ))}
                      <th>Total Rooms</th>
                    </tr>
                    {this.state.availableRooms.map(tot => (
                      <tr key={tot.date}>
                        <td>
                          {tot.date} ({moment(tot.date).format('dddd')})
                        </td>
                        <td>
                          {this.state.availableChecked === true
                            ? tot.AvailableType1
                            : tot.OccupiedType1}
                        </td>
                        <td>
                          {this.state.availableChecked === true
                            ? tot.AvailableType2
                            : tot.OccupiedType2}
                        </td>
                        <td>
                          {this.state.availableChecked === true
                            ? tot.AvailableType3
                            : tot.OccupiedType3}
                        </td>
                        <td>
                          {this.state.availableChecked === true
                            ? tot.TotalAvailable
                            : tot.TotalOccupied}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </>
    )
  }
}

export default DetailedAvailability
