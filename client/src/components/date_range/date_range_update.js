import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { formatDate, parseDate } from 'react-day-picker/moment'

export default class DateRange extends React.Component {
  render () {
    const { from, to } = this.props
    const modifiers = { start: from, end: to }

    return (
      <>
        <DayPickerInput
          render={props => <input {...props} />}
          value={from}
          placeholder='From'
          format='YYYY-MM-DD'
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { after: to },
            toMonth: to,
            modifiers,
            numberOfMonths: 2,
            onDayClick: () => this.to.getInput().focus()
          }}
          onDayChange={this.props.handleFromChange}
        />{' '}
        Departure{' '}
        <span>
          <DayPickerInput
            ref={el => (this.to = el)}
            render={props => <input {...props} />}
            value={to}
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
        </span>
      </>
    )
  }
}
