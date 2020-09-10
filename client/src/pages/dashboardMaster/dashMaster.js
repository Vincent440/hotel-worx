import React from 'react'
import './style.css'

function Dashboard () {
  return (
    <div id='dashboardTable'>
      <div className='btn-group' style={{ display: 'block' }}>
        <a>
          <h5>RESERVATION</h5>
        </a>
        <a className='btn' href='/reserve/new'>
          New Reservation
        </a>
        <a className='btn' href='/reserve/update'>
          Update Reservation
        </a>
      </div>
      <div className='btn-group' style={{ display: 'block' }}>
        <a>
          <h5>FRONT DESK</h5>
        </a>
        <a className='btn' href='/frontdesk/arrivals'>
          Arrivals
        </a>
        <a className='btn' href='/frontdesk/inhouse'>
          In-House Guests
        </a>
        <a className='btn' href='/frontdesk/departures'>
          Departures
        </a>
      </div>
      <div className='btn-group' style={{ display: 'block' }}>
        <a>
          <h5>CASHIERING</h5>
        </a>
        <a className='btn' href='/cashiering/billing'>
          Billing
        </a>
      </div>
      <div className='btn-group' style={{ display: 'block' }}>
        <a>
          <h5>REPORTS</h5>
        </a>
        <a className='btn' href='/reports/housekeeping'>
          Housekeeping Report
        </a>
        <a className='btn' href='/reports/detailavailability'>
          Detailed Availability
        </a>
        <a className='btn' href='/reports/housestatus'>
          House Status
        </a>
        <a className='btn' href='/reports/flashreport'>
          Manager Flash Report
        </a>
      </div>
      <div className='btn-group' style={{ display: 'block' }}>
        <a>
          <h5>CONFIGURATION</h5>
        </a>
        <a className='btn' href='/config/createuser'>
          Create User
        </a>
        <a className='btn' href='/reports/updateuser'>
          Update User
        </a>
      </div>
      <div style={{ clear: 'both' }} />
    </div>
  )
}

export default Dashboard
