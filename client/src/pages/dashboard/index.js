import React from 'react'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { CalendarPlus } from 'react-bootstrap-icons'

const Dashboard = () => (
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
            <h3>
              <CalendarPlus /> New Reservation
            </h3>
          </Link>
        </Card.Footer>
        <Card.Footer>
          <Link
            className='btn btn-primary btn-block clearfix'
            to='/reserve/allreservations'
          >
            <h3>All Reservations</h3>
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

export default Dashboard
