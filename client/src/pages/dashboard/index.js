import React from 'react'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { CalendarPlus } from 'react-bootstrap-icons'

const Dashboard = () => (
  <Row>
    <Col lg={6} xl={3}>
      <Card className='mx-0 px-0'>
        <Card.Header as='h4' className='text-center'>
          RESERVATION
        </Card.Header>
        <Card.Body></Card.Body>
        <Card.Footer>
          <Link
            className='btn btn-primary btn-block'
            to='/reserve/new'
          >
            <h4>
              <CalendarPlus /> New Reservation
            </h4>
          </Link>
        </Card.Footer>
        <Card.Footer>
          <Link
            className='btn btn-primary btn-block'
            to='/reserve/allreservations'
          >
            <h4>All Reservations</h4>
          </Link>
        </Card.Footer>
      </Card>
    </Col>
    <Col lg={6} xl={3}>
      <Card>
        <Card.Header as='h4' className='text-center'>
          FRONT DESK
        </Card.Header>
        <Card.Body></Card.Body>
        <Card.Footer>
          <Link
            className='btn btn-primary btn-block'
            to='/frontdesk/arrivals'
          >
            <h4>Arrivals</h4>
          </Link>
        </Card.Footer>
        <Card.Footer>
          <Link
            className='btn btn-primary btn-block'
            to='/frontdesk/inhouse'
          >
            <h4>In-House Guests</h4>
          </Link>
        </Card.Footer>
        <Card.Footer>
          <Link
            className='btn btn-primary btn-block'
            to='/frontdesk/maintenance'
          >
            <h4>Maintenance</h4>
          </Link>
        </Card.Footer>
      </Card>
    </Col>
    <Col lg={6} xl={3}>
      <Card>
        <Card.Header as='h4' className='text-center'>
          FINANCE
        </Card.Header>
        <Card.Body></Card.Body>
        <Card.Footer>
          <Link
            className='btn btn-primary btn-block'
            to='/cashiering/billing'
          >
            <h4>Billing</h4>
          </Link>
        </Card.Footer>
      </Card>
    </Col>
    <Col lg={6} xl={3}>
      <Card>
        <Card.Header as='h4' className='text-center'>
          REPORTS
        </Card.Header>
        <Card.Body></Card.Body>
        <Card.Footer>
          <Link
            className='btn btn-primary btn-block'
            to='/reports/housekeeping'
          >
            <h4>Housekeeping Report</h4>
          </Link>
        </Card.Footer>
        <Card.Footer>
          <Link
            className='btn btn-primary btn-block'
            to='/reports/detailedAvailability'
          >
            <h4>Detailed Availability</h4>
          </Link>
        </Card.Footer>
        <Card.Footer>
          <Link
            className='btn btn-primary btn-block'
            to='/reports/houseStatus'
          >
            <h4>House Status</h4>
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  </Row>
)

export default Dashboard
