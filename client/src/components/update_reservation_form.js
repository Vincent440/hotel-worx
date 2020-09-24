import React from 'react'
import CreditCardInput from 'react-credit-card-input'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NumberFormat from 'react-number-format'

class UpdateReservationForm extends React.Component {
  render () {
    return (
      <div>
        <div>
          <Row>
            <Col xl={12}>
              <form
                method='post'
                name='userRegistrationForm'
                onSubmit={this.props.handleFormSubmit}
              >
                <Row>
                  <Col xs={6} sm={4} md={2} lg={2} xl={2}>
                    <label>First Name</label>
                  </Col>
                  <Col xs={6} sm={8} md={4} lg={3} xl={3}>
                    <input
                      type='text'
                      name='firstname'
                      placeholder='First Name'
                      value={this.props.firstname}
                      onChange={this.props.handleChange}
                    />
                    <div className='text-danger'>
                      {this.props.errors.firstname}
                    </div>
                  </Col>
                  <Col xs={6} sm={4} md={2} lg={2} xl={2}>
                    <label>Last Name</label>
                  </Col>
                  <Col xs={6} sm={8} md={2} lg={2} xl={2}>
                    <input
                      type='text'
                      name='lastname'
                      placeholder='Last Name'
                      value={this.props.lastname}
                      onChange={this.props.handleChange}
                    />
                    <div className='text-danger'>{this.props.errors.lastname}</div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} sm={4} md={2} lg={2} xl={2}>
                    Phone Number
                  </Col>
                  <Col xs={6} sm={8} md={4} lg={3} xl={3}>
                    <NumberFormat
                      format='###-###-####'
                      mask='_'
                      placeholder='Phone Number'
                      name='phone'
                      value={this.props.phone}
                      onChange={this.props.handleChange}
                    />
                    <div className='text-danger'>{this.props.errors.phone}</div>
                  </Col>
                  <Col xs={6} sm={4} md={2} lg={2} xl={2}>
                    Email Address
                  </Col>
                  <Col xs={6} sm={8} md={2} lg={2} xl={2}>
                    <input
                      type='text'
                      name='email'
                      placeholder='Email Address'
                      value={this.props.email}
                      onChange={this.props.handleChange}
                    />
                    <div className='text-danger'>{this.props.errors.email}</div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} sm={4} md={2} lg={2} xl={2}>
                    Address
                  </Col>
                  <Col xs={6} sm={8} md={3} lg={3} xl={3}>
                    <input
                      type='text'
                      placeholder='Address'
                      name='address'
                      value={this.props.address}
                      onChange={this.props.handleChange}
                    />
                  </Col>
                  <Col xs={1} sm={1} md={2} lg={2} xl={2}>
                    <input
                      type='text'
                      placeholder='City'
                      name='city'
                      value={this.props.city}
                      onChange={this.props.handleChange}
                    />
                  </Col>
                  <Col xs={1} sm={1} md={1} lg={1} xl={2}>
                    <input
                      type='text'
                      placeholder='State'
                      name='state'
                      value={this.props.state}
                      onChange={this.props.handleChange}
                    />
                  </Col>
                  <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                    <input
                      type='text'
                      placeholder='ZipCode'
                      name='zip'
                      value={this.props.zip}
                      onChange={this.props.handleChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={2} sm={4} md={2} lg={2} xl={2}>
                    Credit Card Number
                  </Col>
                  <Col xs={10} sm={8} md={8} lg={9} xl={9}>
                    <CreditCardInput
                      cardNumberInputProps={{
                        name: 'creditCard',
                        value: this.props.creditCard,
                        onChange: this.props.handleChange
                      }}
                      cardExpiryInputProps={{
                        name: 'expirationDate',
                        value: this.props.expirationDate,
                        onChange: this.props.handleChange
                      }}
                      cardCVCInputProps={{
                        name: 'cvc',
                        value: this.props.cvc,
                        onChange: this.handleChange
                      }}
                      fieldClassName='input'
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={2} sm={4} md={2} lg={2} xl={2}>
                    Comments
                  </Col>
                  <Col xs={10} sm={8} md={10} lg={10} xl={10}>
                    <input
                      type='text'
                      placeholder='Comment'
                      name='comment'
                      value={this.props.comment}
                      onChange={this.props.handleChange}
                    />
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </div>
        <div className='text-center'>
          {this.props.checkedIn === 1 || this.props.active === 0 ? (
            <button
              type='submit'
              className='btn btn-primary m-2'
              onClick={this.props.handleCancelSubmit}
              disabled
            >
              Cancel Reservation
            </button>
          ) : (
            <button
              type='submit'
              className='btn btn-primary m-2'
              onClick={this.props.handleCancelSubmit}
            >
              Cancel Reservation
            </button>
          )}
          <button
            type='submit'
            className='btn btn-primary m-2'
            onClick={this.props.handleFormSubmit}
          >
            Submit
          </button>
          <br />
          <span className='text-success'>
            {this.props.updateSuccess &&
              'Reservation was successfully updated!'}
          </span>
          <span className='text-success'>
            {this.props.cancelSuccess && 'Reservation has been cancelled!'}
          </span>
        </div>
      </div>
    )
  }
}
export default UpdateReservationForm