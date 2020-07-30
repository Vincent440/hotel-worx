import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Header = props => {
  return (
    <div className='card'>
      <Row className='card-body'>
        <Col xs={9} sm={10} md={10} lg={11}>
          <h2 className='text-center'>{props.children}</h2>
        </Col>
        <Col xs={3} sm={2} md={2} lg={1}>
          <Link title='Return to Dashboard' className='btn btn-lg btn-danger' to='/' type='button'>
            <svg
              width='2em'
              height='2em'
              viewBox='0 0 16 16'
              class='bi bi-x-square'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'
              />
              <path
                fill-rule='evenodd'
                d='M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z'
              />
              <path
                fill-rule='evenodd'
                d='M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z'
              />
            </svg>
          </Link>
        </Col>
      </Row>
    </div>
  )
}

export default Header
