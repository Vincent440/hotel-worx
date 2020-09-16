import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { formatDate, parseDate } from 'react-day-picker/moment'
import moment from 'moment'

export default class DateRange extends React.Component {
  render () {
    const { from, to } = this.props
    const modifiers = { start: from, end: to }
    return (
      <div className='InputFromTo'>
        <DayPickerInput
          {...from}
          value={moment(from.value).format('YYYY-MM-DD')}
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
        />{' '}
        -{' '}
        <span className='InputFromTo-to'>
          <DayPickerInput
            {...to}
            value={moment(to.value).format('YYYY-MM-DD')}
            ref={el => (this.to = el)}
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
      </div>
    )
  }
}
