import React from 'react'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

// import checkinLogo from '././images/checkin.png'
// import housekeepingLogo from './images/maid.png'
// import inhouseLogo from './images/bed.png'
// import bookingLogo from './images/hotel.png'
// import updateLogo from './images/update.png'
// import billingLogo from './images/bill.png'
// import detailedLogo from './images/report.png'
// import houseLogo from './images/communications.png'
// import maintenanceLogo from './images/maintenanceLogo.png'

function Dashboard () {
  return (
    <Row>
      <Col lg={6} xl={3}>
        <Card>
          <Card.Header as='h2' className='text-center'>
            RESERVATION
          </Card.Header>
          <Card.Body></Card.Body>
          <Card.Footer>
            <Link
              className='btn btn-primary btn-block clearfix'
              to='/reserve/new'
            >
              <svg
                width='2.25em'
                height='2.25em'
                viewBox='0 0 16 16'
                className='float-left bi bi-calendar-plus'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M8 7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z'
                />
                <path
                  fillRule='evenodd'
                  d='M7.5 9.5A.5.5 0 0 1 8 9h2a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0v-2z'
                />
                <path
                  fillRule='evenodd'
                  d='M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1zm1-3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z'
                />
                <path
                  fillRule='evenodd'
                  d='M3.5 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5zm9 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5z'
                />
              </svg>
              <h3>New Reservation</h3>
            </Link>
          </Card.Footer>
          <Card.Footer>
            <Link
              className='btn btn-primary btn-block clearfix'
              to='/reserve/allreservations'
            >
              <h3>Update Reservation</h3>
            </Link>
          </Card.Footer>
        </Card>
      </Col>
      <Col lg={6} xl={3}>
        <Card>
          <Card.Header as='h2' className='text-center'>
            FRONT DESK
          </Card.Header>
          <Card.Body></Card.Body>
          <Card.Footer>
            <Link
              className='btn btn-primary btn-block clearfix'
              to='/frontdesk/arrivals'
            >
              <h3>Arrivals</h3>
            </Link>
          </Card.Footer>
          <Card.Footer>
            <Link
              className='btn btn-primary btn-block clearfix'
              to='/frontdesk/inhouse'
            >
              <h3>In-House Guests</h3>
            </Link>
          </Card.Footer>
          <Card.Footer>
            <Link
              className='btn btn-primary btn-block clearfix'
              to='/frontdesk/maintenance'
            >
              <h3>Maintenance</h3>
            </Link>
          </Card.Footer>
        </Card>
      </Col>
      <Col lg={6} xl={3}>
        <Card>
          <Card.Header as='h2' className='text-center'>
            FINANCE
          </Card.Header>
          <Card.Body></Card.Body>
          <Card.Footer>
            <Link
              className='btn btn-primary btn-block clearfix'
              to='/cashiering/billing'
            >
              <h3>Billing</h3>
            </Link>
          </Card.Footer>
        </Card>
      </Col>
      <Col lg={6} xl={3}>
        <Card>
          <Card.Header as='h2' className='text-center'>
            REPORTS
          </Card.Header>
          <Card.Body></Card.Body>
          <Card.Footer>
            <Link
              className='btn btn-primary btn-block clearfix'
              to='/reports/housekeeping'
            >
              <h3>Housekeeping Report</h3>
            </Link>
          </Card.Footer>
          <Card.Footer>
            <Link
              className='btn btn-primary btn-block clearfix'
              to='/reports/detailedAvailability'
            >
              <h3>Detailed Availability</h3>
            </Link>
          </Card.Footer>
          <Card.Footer>
            <Link
              className='btn btn-primary btn-block clearfix'
              to='/reports/houseStatus'
            >
              <h3>House Status</h3>
            </Link>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  )
}

export default Dashboard
