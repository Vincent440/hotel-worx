import React from 'react'
import CreditCardInput from 'react-credit-card-input'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NumberFormat from 'react-number-format'

const UpdateReservationForm = props => {
  return (
    <>
      <Row>
        <Col xl={12}>
          <form
            method='post'
            name='userRegistrationForm'
            onSubmit={props.handleFormSubmit}
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
                  value={props.firstname}
                  onChange={props.handleChange}
                />
                <div className='text-danger'>{props.errors.firstname}</div>
              </Col>
              <Col xs={6} sm={4} md={2} lg={2} xl={2}>
                <label>Last Name</label>
              </Col>
              <Col xs={6} sm={8} md={2} lg={2} xl={2}>
                <input
                  type='text'
                  name='lastname'
                  placeholder='Last Name'
                  value={props.lastname}
                  onChange={props.handleChange}
                />
                <div className='text-danger'>{props.errors.lastname}</div>
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
                  value={props.phone}
                  onChange={props.handleChange}
                />
                <div className='text-danger'>{props.errors.phone}</div>
              </Col>
              <Col xs={6} sm={4} md={2} lg={2} xl={2}>
                Email Address
              </Col>
              <Col xs={6} sm={8} md={2} lg={2} xl={2}>
                <input
                  type='text'
                  name='email'
                  placeholder='Email Address'
                  value={props.email}
                  onChange={props.handleChange}
                />
                <div className='text-danger'>{props.errors.email}</div>
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
                  value={props.address}
                  onChange={props.handleChange}
                />
              </Col>
              <Col xs={1} sm={1} md={2} lg={2} xl={2}>
                <input
                  type='text'
                  placeholder='City'
                  name='city'
                  value={props.city}
                  onChange={props.handleChange}
                />
              </Col>
              <Col xs={1} sm={1} md={1} lg={1} xl={2}>
                <input
                  type='text'
                  placeholder='State'
                  name='state'
                  value={props.state}
                  onChange={props.handleChange}
                />
              </Col>
              <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                <input
                  type='text'
                  placeholder='ZipCode'
                  name='zip'
                  value={props.zip}
                  onChange={props.handleChange}
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
                    value: props.creditCard,
                    onChange: props.handleChange
                  }}
                  cardExpiryInputProps={{
                    name: 'expirationDate',
                    value: props.expirationDate,
                    onChange: props.handleChange
                  }}
                  cardCVCInputProps={{
                    name: 'cvc',
                    value: props.cvc,
                    onChange: props.handleChange
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
                  value={props.comment}
                  onChange={props.handleChange}
                />
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
      <div className='text-center'>
        {props.checkedIn === 1 || props.active === 0 ? (
          <button
            type='submit'
            className='btn btn-primary m-2'
            onClick={props.handleCancelSubmit}
            disabled
          >
            Cancel Reservation
          </button>
        ) : (
          <button
            type='submit'
            className='btn btn-primary m-2'
            onClick={props.handleCancelSubmit}
          >
            Cancel Reservation
          </button>
        )}
        <button
          type='submit'
          className='btn btn-primary m-2'
          onClick={props.handleFormSubmit}
        >
          Submit
        </button>
        <p className='text-success'>
          {props.updateSuccess && 'Reservation was successfully updated!'}
        </p>
        <p className='text-success'>
          {props.cancelSuccess && 'Reservation has been cancelled!'}
        </p>
      </div>
    </>
  )
}
export default UpdateReservationForm
