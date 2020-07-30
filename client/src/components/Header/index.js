import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Header = props => {
  return (
    <div className='card'>
      <Row className='card-body'>
        <Col xs={9} sm={10} md={10} lg={11} xl={11}>
          <h2 className='text-center'>{props.children}</h2>
        </Col>
        <Col xs={3} sm={2} md={2} lg={1} xl={1}>
          <Link className='btn btn-warning' to='/' type='submit'>X</Link>
        </Col>
      </Row>
    </div>

  )
}

export default Header
