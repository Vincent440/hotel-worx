import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Header from '../../components/header'
import SearchButton from '../../components/search_button'
import api from '../../utils/api'

class Billing extends Component {
  state = {
    firstname: '',
    lastname: '',
    arrivaldate: '',
    departuredate: '',
    departuresArray: [],
    roomNumber: '',
    taxRates: {},
    checkOutSuccess: false,
    checked_out: false,
    res_room_id: '',
    invoice_id: '',
    stayOver: false,
    dueOut: false,
    checkedOut: false,
    room_num: ''
  }

  makeAxiosCall = () => {
    const criteria = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      roomNumber: this.state.roomNumber,
      stayOver: this.state.stayOver,
      dueOut: this.state.dueOut,
      checkedOut: this.state.checkedOut
    }

    api
      .getDepartures(criteria)
      .then(res => this.setState({ departuresArray: res }))
      .catch(err => console.log(err))
  }

  handleCheckOut = (id, room_num) => {
    this.setState({
      res_room_id: id,
      checkOutSuccess: true,
      room_num: room_num
    })
  }

  handleLinkInvoice = (id, room_num) => {
    this.setState({ res_room_id: id, room_num: room_num })
    api
      .getInvoiceId(id)
      .then(res =>
        this.setState({
          checkOutSuccess: true,
          invoice_id: res[0].invoice_id,
          checked_out: true
        })
      )
      .catch(err => console.log(err))
  }

  componentDidMount () {
    this.makeAxiosCall()
    api
      .getTaxRates()
      .then(res => this.setState({ taxRates: res[0] }))
      .catch(err => console.log(err))
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleCheckChange = event => {
    event.target.name === 'stayOver'
      ? this.setState({
          stayOver: !this.state.stayOver,
          dueOut: false,
          checkedOut: false
        })
      : event.target.name === 'dueOut'
      ? this.setState({
          stayOver: false,
          dueOut: !this.state.dueOut,
          checkedOut: false
        })
      : event.target.name === 'checkedOut'
      ? this.setState({
          stayOver: false,
          dueOut: false,
          checkedOut: !this.state.checkedOut
        })
      : this.setState({ stayOver: false, dueOut: false, checkedOut: false })
  }

  handleFormSubmit = event => {
    event.preventDefault()
    this.makeAxiosCall()
  }

  render () {
    if (this.state.checkOutSuccess) {
      if (this.state.checked_out) {
        return (
          <Redirect
            to={{
              pathname: '/cashiering/payment',
              state: {
                invoice_id: this.state.invoice_id,
                room_num: this.state.room_num
              }
            }}
          />
        )
      } else {
        return (
          <Redirect
            to={{
              pathname: '/cashiering/payment',
              state: {
                res_room_id: this.state.res_room_id,
                room_num: this.state.room_num
              }
            }}
          />
        )
      }
    }
    return (
      <>
        <Header>FINANCE</Header>
        <Card body>
          <Row>
            <Col xs={8} sm={8} md={8} lg={5} xl={4}>
              <Row>
                <Col xs={4} sm={6} md={4} lg={6} xl={4}>
                  Room No
                </Col>
                <Col xs={4} sm={4} md={4} lg={2} xl={2}>
                  <input
                    type='text'
                    onChange={this.handleInputChange}
                    name='roomNumber'
                    placeholder='Room Number'
                    value={this.state.roomNumber}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={4} sm={6} md={4} lg={6} xl={4}>
                  First Name
                </Col>
                <Col xs={4} sm={4} md={4} lg={2} xl={2}>
                  <input
                    type='text'
                    placeholder='First Name'
                    name='firstname'
                    value={this.state.firstname}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={4} sm={6} md={4} lg={6} xl={4}>
                  {' '}
                  Last Name
                </Col>
                <Col xs={4} sm={4} md={4} lg={2} xl={2}>
                  <input
                    type='text'
                    placeholder='Last Name'
                    name='lastname'
                    value={this.state.lastname}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={4} sm={6} md={4} lg={5} xl={4}>
              <Row>
                <Col xs={4} sm={8} md={8} lg={6} xl={4}>
                  Stay Over
                </Col>
                <Col xs={4} sm={4} md={2} lg={2} xl={2}>
                  <input
                    type='checkbox'
                    name='stayOver'
                    checked={this.state.stayOver}
                    onChange={this.handleCheckChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={4} sm={8} md={8} lg={6} xl={4}>
                  Due Out
                </Col>
                <Col xs={4} sm={4} md={2} lg={2} xl={2}>
                  <input
                    type='checkbox'
                    name='dueOut'
                    checked={this.state.dueOut}
                    onChange={this.handleCheckChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={4} sm={8} md={8} lg={6} xl={4}>
                  Checked Out
                </Col>
                <Col xs={4} sm={4} md={2} lg={2} xl={2}>
                  <input
                    type='checkbox'
                    name='checkedOut'
                    checked={this.state.checkedOut}
                    onChange={this.handleCheckChange}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={4}>
              <SearchButton handleFormSubmit={this.handleFormSubmit} />
            </Col>
          </Row>
          <Row>
            <Col xl={12}>
              <Table>
                <tbody>
                  <tr>
                    <th>Room Number</th>
                    <th>Name</th>
                    <th>Arrival Date</th>
                    <th>Departure Date</th>
                    <th>Balance</th>
                    <th></th>
                  </tr>

                  {this.state.departuresArray.map((departure, i) => (
                    <tr key={departure.res_room_id}>
                      <td>{departure.room_num}</td>
                      <td>{departure.name}</td>
                      <td>{departure.check_in_date}</td>
                      <td>{departure.check_out_date}</td>
                      <td>
                        {Number(
                          Number(departure.num_days * departure.rate) +
                            Number(
                              (
                                departure.num_days *
                                departure.rate *
                                this.state.taxRates.county_rate
                              ).toFixed(2)
                            ) +
                            Number(
                              (
                                departure.num_days *
                                departure.rate *
                                this.state.taxRates.city_rate
                              ).toFixed(2)
                            ) +
                            Number(
                              (
                                departure.num_days *
                                departure.rate *
                                this.state.taxRates.state_rate
                              ).toFixed(2)
                            )
                        ).toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD'
                        })}
                      </td>
                      <td>
                        {this.state.departuresArray[i].checked_out === 0 ? (
                          <button
                            onClick={() =>
                              this.handleCheckOut(
                                departure.res_room_id,
                                this.state.departuresArray[i].room_num
                              )
                            }
                          >
                            Check Out
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              this.handleLinkInvoice(
                                departure.res_room_id,
                                this.state.departuresArray[i].room_num
                              )
                            }
                          >
                            Invoice
                          </button>
                        )}
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

export default Billing
