import React from 'react'
import CreditCardInput from 'react-credit-card-input'
import NumberFormat from 'react-number-format'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'

const RegistrationForm = props => (
  <Form
    method='post'
    name='userRegistrationForm'
    onSubmit={props.handleFormSubmit}
  >
    <Form.Row>
      <Col className='form-group' md={6} lg={3}>
        <label htmlFor='first-name-input'>First Name</label>
        <input
          className='form-control'
          type='text'
          name='firstname'
          id='first-name-input'
          placeholder='First Name'
          value={props.firstname}
          onChange={props.handleChange}
        />
        <div className='text-danger'>{props.errors.firstname}</div>
      </Col>
      <Col className='form-group' md={6} lg={3}>
        <label htmlFor='last-name-input'>Last Name</label>
        <input
          className='form-control'
          type='text'
          name='lastname'
          id='last-name-input'
          placeholder='Last Name'
          value={props.lastname}
          onChange={props.handleChange}
        />
        <div className='text-danger'>{props.errors.lastname}</div>
      </Col>
      <Col className='form-group' md={6} lg={3}>
        <label htmlFor='phone-input'>Phone Number</label>
        <NumberFormat
          className='form-control'
          format='###-###-####'
          mask='_'
          placeholder='Phone Number'
          name='phone'
          id='phone-input'
          value={props.phone}
          onChange={props.handleChange}
        />
        <div className='text-danger'>{props.errors.phone}</div>
      </Col>
      <Col className='form-group' md={6} lg={3}>
        <label htmlFor='email-input'>Email Address</label>
        <input
          className='form-control'
          type='text'
          name='email'
          id='email-input'
          placeholder='Email Address'
          value={props.email}
          onChange={props.handleChange}
        />
        <div className='text-danger'>{props.errors.email}</div>
      </Col>
    </Form.Row>

    <Form.Row>
      <Col className='form-group' sm={12} lg={5}>
        <label htmlFor='address-input'>Address</label>
        <input
          className='form-control'
          type='text'
          placeholder='Street Address'
          name='address'
          id='address-input'
          value={props.address}
          onChange={props.handleChange}
        />
      </Col>
      <Col className='form-group' sm={6} md={4} lg={3}>
        <label htmlFor='city-input'>City</label>
        <input
          className='form-control'
          type='text'
          placeholder='City'
          name='city'
          id='city-input'
          value={props.city}
          onChange={props.handleChange}
        />
      </Col>
      <Col className='form-group' sm={3} md={4} lg={2}>
        <label htmlFor='state-input'>State</label>

        <input
          className='form-control'
          type='text'
          placeholder='State'
          name='state'
          id='state-input'
          value={props.state}
          onChange={props.handleChange}
        />
      </Col>
      <Col className='form-group' sm={3} md={4} lg={2}>
        <label htmlFor='zipcode-input'>ZIP code</label>
        <input
          className='form-control'
          type='text'
          placeholder='ZIP code'
          name='zip'
          id='zipcode-input'
          value={props.zip}
          onChange={props.handleChange}
        />
      </Col>
    </Form.Row>
    <Row>
      <Col md={2}>Credit card number</Col>
      <Col md={10}>
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
        />
      </Col>
    </Row>
    <Row className='d-flex justify-content-center'>
      <Col className='form-group' md={9} lg={8}>
        <label htmlFor='room-comments'>Comments</label>
        <textarea
          className='form-control'
          type='text'
          name='room_comments'
          id='room-comments'
          value={props.comments}
          onChange={props.handleChange}
        />
      </Col>
    </Row>
    <Form.Row>
      <button
        type='submit'
        className='btn text-center btn-primary'
        onClick={props.handleFormSubmit}
      >
        Submit
      </button>
    </Form.Row>
  </Form>
)

export default RegistrationForm
