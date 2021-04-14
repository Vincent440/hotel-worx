import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftSquare } from 'react-bootstrap-icons'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const Header = props => (
  <Card body className='my-4 mt-sm-0 d-print-none'>
    <Row>
      <Col xs={1}>
        <Link title='Return to Dashboard' to='/' className='text-danger'>
          <ArrowLeftSquare size={50} />
        </Link>
      </Col>
      <Col xs={11}>
        <h1 className='text-center pt-2'>{props.children}</h1>
      </Col>
    </Row>
  </Card>
)

export default Header
