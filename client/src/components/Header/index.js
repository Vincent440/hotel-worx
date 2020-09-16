import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftSquare } from 'react-bootstrap-icons'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const Header = props => (
  <Card className='my-3'>
    <Card.Body>
      <Row>
        <Col md={2} lg={1}>
          <Link title='Return to Dashboard' to='/' className='text-danger'>
            <ArrowLeftSquare size={80} />
          </Link>
        </Col>
        <Col md={10} lg={11}>
          <h1 className='text-center pt-2'>{props.children}</h1>
        </Col>
      </Row>
    </Card.Body>
  </Card>
)

export default Header
