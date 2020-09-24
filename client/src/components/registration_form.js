import React from 'react'
import CreditCardInput from 'react-credit-card-input'
import NumberFormat from 'react-number-format'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

class RegistrationForm extends React.Component {
  render () {
    return (
      <Form
        method='post'
        name='userRegistrationForm'
        onSubmit={this.props.handleFormSubmit}
      >
        <Form.Row>
          <Col className='form-group' md={6} lg={3}>
            <label htmlFor='firstname-input'>First Name</label>
            <input
              className='form-control'
              type='text'
              name='firstname'
              id='firstname-input'
              placeholder='First Name'
              value={this.props.firstname}
              onChange={this.props.handleChange}
            />
            <div className='text-danger'>{this.props.errors.firstname}</div>
          </Col>
          <Col className='form-group' md={6} lg={3}>
            <label htmlFor='lastname-input'>Last Name</label>
            <input
              className='form-control'
              type='text'
              name='lastname'
              id='lastname-input'
              placeholder='Last Name'
              value={this.props.lastname}
              onChange={this.props.handleChange}
            />
            <div className='text-danger'>{this.props.errors.lastname}</div>
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
              value={this.props.phone}
              onChange={this.props.handleChange}
            />
            <div className='text-danger'>{this.props.errors.phone}</div>
          </Col>
          <Col className='form-group' md={6} lg={3}>
            <label htmlFor='email-input'>Email Address</label>
            <input
              className='form-control'
              type='text'
              name='email'
              id='email-input'
              placeholder='Email Address'
              value={this.props.email}
              onChange={this.props.handleChange}
            />
            <div className='text-danger'>{this.props.errors.email}</div>
          </Col>
        </Form.Row>

        <Form.Row>
          <Col className='form-group' xs={6} sm={4} md={2} lg={2} xl={2}>
            <label htmlFor='address-input'>Address</label>
            <input
              className='form-control'
              type='text'
              placeholder='Street Address'
              name='address'
              id='address-input'
              value={this.props.address}
              onChange={this.props.handleChange}
            />
          </Col>

          <Col className='form-group' xs={1} sm={1} md={2} lg={2} xl={2}>
            <label htmlFor='city-input'>City</label>
            <input
              className='form-control'
              type='text'
              placeholder='City'
              name='city'
              id='city-input'
              value={this.props.city}
              onChange={this.props.handleChange}
            />
          </Col>
          <Col className='form-group' xs={1} sm={1} md={1} lg={2} xl={2}>
            <label htmlFor='state-input'>State</label>

            <input
              className='form-control'
              type='text'
              placeholder='State'
              name='state'
              id='state-input'
              value={this.props.state}
              onChange={this.props.handleChange}
            />
          </Col>
          <Col className='form-group' xs={1} sm={1} md={1} lg={1} xl={1}>
            <label htmlFor='zipcode-input'>ZIP code</label>
            <input
              className='form-control'
              type='text'
              placeholder='ZIP code'
              name='zip'
              id='zipcode-input'
              value={this.props.zip}
              onChange={this.props.handleChange}
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col xs={2} sm={4} md={2} lg={2} xl={2}>
            Credit Card No
          </Col>
          <Col xs={10} sm={8} md={8} lg={9} xl={9}>
            <CreditCardInput
              cardNumberInputProps={{
                name: 'creditCard',
                value: this.creditCard,
                onChange: this.props.handleChange
              }}
              cardExpiryInputProps={{
                name: 'expirationDate',
                value: this.expirationDate,
                onChange: this.props.handleChange
              }}
              cardCVCInputProps={{
                name: 'cvc',
                value: this.cvc,
                onChange: this.handleChange
              }}
              fieldClassName='input'
            />
          </Col>
        </Form.Row>
        <Form.Row className='d-flex justify-content-center'>
          <Col className='form-group' md={8}>
            <label htmlFor='room-comments'>Comments</label>
            <textarea
              className='form-control'
              type='text'
              name='room_comments'
              id='room-comments'
              value={this.props.comments}
              onChange={this.props.handleChange}
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <button
            type='submit'
            className='btn text-center btn-primary'
            onClick={this.props.handleFormSubmit}
          >
            Submit
          </button>
        </Form.Row>
      </Form>
    )
  }
}

export default RegistrationForm
