import React, { Component } from 'react'
import moment from 'moment'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'

import api from '../../utils/api'
import DeatiledSubmit from '../../components/detailedSubmit'
import Header from '../../components/Header'

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
      <div>
        <Row>
          <Col xl={12}>
            <Header>DETAILED AVAILABILITY</Header>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <div id='res'>
              <Row>
                <DeatiledSubmit
                  availableChecked={this.state.availableChecked}
                  occupiedChecked={this.state.occupiedChecked}
                  handleCheckbox={this.handleCheckbox}
                  handleStartDate={this.handleStartDate}
                />
              </Row>
            </div>
            <div id='res'>
              <Row style={{ paddingBottom: '20px' }}>
                <Col xl={12}>
                  <Table>
                    <tbody>
                      <tr>
                        <th className='th' id='date'>
                          Date
                        </th>
                        {this.state.roomTypes.map(type => (
                          <th key={type.room_type_id} className='th'>
                            {type.type}
                          </th>
                        ))}
                        <th className='th' id='total'>
                          Total Rooms
                        </th>
                      </tr>
                      {this.state.availableRooms.map(tot => (
                        <tr key={tot.date}>
                          <td className='tableTD'>
                            {tot.date} ({moment(tot.date).format('dddd')})
                          </td>
                          <td className='tableTD'>
                            {this.state.availableChecked === true
                              ? tot.AvailableType1
                              : tot.OccupiedType1}
                          </td>
                          <td className='tableTD'>
                            {this.state.availableChecked === true
                              ? tot.AvailableType2
                              : tot.OccupiedType2}
                          </td>
                          <td className='tableTD'>
                            {this.state.availableChecked === true
                              ? tot.AvailableType3
                              : tot.OccupiedType3}
                          </td>
                          <td className='tableTD'>
                            {this.state.availableChecked === true
                              ? tot.TotalAvailable
                              : tot.TotalOccupied}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default DetailedAvailability
