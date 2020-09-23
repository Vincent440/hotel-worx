import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Header from '../../components/header'
import Table from 'react-bootstrap/Table'
import api from '../../utils/api'
import { Link } from 'react-router-dom'
import moment from 'moment'
class Payment extends Component {
  state = {
    RoomInfo: [],
    InvoiceArray: [],
    invoice_id: '',
    paid: false,
    res_room_id: '',
    room_num: '',
    taxRates: {},
    creditCardChecked: true,
    cashChecked: false,
    payment_type: 'Credit Card'
  }

  componentDidMount () {
    if (this.props.location.state.invoice_id) {
      this.setState(
        { paid: true, room_num: this.props.location.state.room_num },
        () => {
          this.makeAxiosCall(this.props.location.state.invoice_id)
        }
      )
    } else if (this.props.location.state.res_room_id) {
      api
        .getTaxRates()
        .then(res => this.setState({ taxRates: res[0] }))
        .catch(err => console.log(err))
      this.setState(
        {
          res_room_id: this.props.location.state.res_room_id,
          room_num: this.props.location.state.room_num
        },
        () => {
          api
            .getPreInvoice(this.state.res_room_id)
            .then(res => this.setState({ InvoiceArray: res }))
            .catch(err => console.log(err))
        }
      )
    }
  }

  makeAxiosCall = id => {
    api
      .getInvoice(id)
      .then(res => this.setState({ InvoiceArray: res }))
      .catch(err => console.log(err))
  }

  handleCheckbox = event => {
    event.target.value === 'creditCard'
      ? this.setState({
          creditCardChecked: true,
          cashChecked: false,
          payment_type: 'Credit Card'
        })
      : this.setState({
          creditCardChecked: false,
          cashChecked: true,
          payment_type: 'Cash'
        })
  }

  handleSubmitPayment = event => {
    event.preventDefault()
    api
      .updateRoomCheckout(
        this.state.res_room_id,
        this.state.room_num,
        this.state.payment_type
      )
      .then(res => this.setState({ paid: true, invoice_id: res[1].data }))
      .catch(err => console.log(err))
      .then(() => this.makeAxiosCall(this.state.invoice_id))
  }

  render () {
    return (
      <div>
        <Row>
          <Col xl={12}>
            <Header>INVOICE</Header>
          </Col>
        </Row>
        <div>
          <Row>
            {this.state.InvoiceArray.map(invoice => (
              <div className='p-2' key={invoice.res_room_id}>
                <Table border='1' className='mb-3'>
                  <tbody>
                    <tr>
                      <th>Room Number:</th>
                      <th>Name:</th>
                      <th>CC Number: </th>
                      <th>Checked In Date:</th>
                      <th>Check Out Date:</th>
                      <th>Payment Type:</th>
                    </tr>
                    <tr>
                      <td>{this.state.room_num}</td>
                      <td>
                        {invoice.first_name} {invoice.last_name}
                      </td>
                      <td>****-****-****-{invoice.ccLastFour}</td>
                      <td>
                        {moment(invoice.check_in_date).format('YYYY-MM-DD')}
                      </td>
                      <td>
                        {moment(invoice.check_out_date).format('YYYY-MM-DD')}
                      </td>
                      <td>{invoice.payment_type}</td>
                    </tr>
                  </tbody>
                </Table>
                <Table border='1'>
                  <tbody>
                    <tr>
                      <th>Num Nights</th>
                      <th>Rate</th>
                      <th>Room Total</th>
                      <th>County Tax</th>
                      <th>City Tax</th>
                      <th>State Tax</th>
                      <th>Total Due</th>
                    </tr>
                    <tr>
                      <td>{invoice.num_days}</td>
                      <td>${invoice.rate}</td>
                      <td>
                        $
                        {(
                          parseInt(invoice.num_days) * parseFloat(invoice.rate)
                        ).toFixed(2)}{' '}
                      </td>
                      <td>${invoice.county_tax}</td>
                      <td>${invoice.city_tax}</td>
                      <td>${invoice.state_tax}</td>
                      <td>
                        $
                        {(
                          parseInt(invoice.num_days) *
                            parseFloat(invoice.rate) +
                          parseFloat(invoice.county_tax) +
                          parseFloat(invoice.city_tax) +
                          parseFloat(invoice.state_tax)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            ))}
          </Row>
          {this.state.paid ? (
            ''
          ) : (
            <div>
              <Row>
                <Col className='text-center'>
                  Credit Card
                  <input
                    className='mt-4 ml-2 mr-4'
                    type='checkbox'
                    value='creditCard'
                    checked={this.state.creditCardChecked}
                    onChange={this.handleCheckbox}
                  />
                  Cash
                  <input
                    className='mt-4 ml-2'
                    type='checkbox'
                    value='cash'
                    checked={this.state.cashChecked}
                    onChange={this.handleCheckbox}
                  />
                </Col>
              </Row>
              <Row className='mt-4'>
                <Col className='text-center'>
                  <button
                    className='btn btn-primary'
                    onClick={this.handleSubmitPayment}
                  >
                    Submit Payment
                  </button>
                </Col>
              </Row>
            </div>
          )}
          <Row className='mt-4'>
            <Col className='text-center'>
              <Link className='btn btn-primary m-3' to='/cashiering/billing'>
                Back to Billing
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Payment
