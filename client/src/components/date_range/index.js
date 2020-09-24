import React from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { formatDate, parseDate } from 'react-day-picker/moment'

export default class DateRange extends React.Component {
  render () {
    const { from, to } = this.props
    const modifiers = { start: from, end: to }

    return (
      <>
        <Form.Row className='form-group mx-3'>
          <Col sm={4} md={3} as='label' htmlFor='arrival-input'>
            Arrival
          </Col>
          <Col sm={8} md={9}>
            <DayPickerInput
              render={props => <input {...props} />}
              value={from}
              inputProps={{ id: 'arrival-input', className: 'form-control-lg' }}
              placeholder='From'
              format='YYYY-MM-DD'
              formatDate={formatDate}
              parseDate={parseDate}
              dayPickerProps={{
                selectedDays: [from, { from, to }],
                disabledDays: { before: new Date(), after: to },
                toMonth: to,
                modifiers,
                numberOfMonths: 2,
                onDayClick: () => this.to.getInput().focus()
              }}
              onDayChange={this.props.handleFromChange}
            />
          </Col>
        </Form.Row>
        <Form.Row className='form-group mx-3'>
          <Col sm={4} md={3} as='label' htmlFor='departure-input'>
            Departure
          </Col>
          <Col sm={8} md={9}>
            <DayPickerInput
              ref={el => (this.to = el)}
              value={to}
              inputProps={{
                id: 'departure-input',
                className: 'form-control-lg'
              }}
              placeholder='To'
              format='YYYY-MM-DD'
              formatDate={formatDate}
              parseDate={parseDate}
              dayPickerProps={{
                selectedDays: [from, { from, to }],
                disabledDays: { before: from },
                modifiers,
                month: from,
                fromMonth: from,
                numberOfMonths: 2
              }}
              onDayChange={this.props.handleToChange}
            />
          </Col>
        </Form.Row>
      </>
    )
  }
}
