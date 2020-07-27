import React from 'react'
import './style.css'
import { Row, Col } from 'react-grid-system'

const DeatiledSubmit = props => {
  return (
    <Col xl={12}>
      <Row style={{ marginBottom: '5px' }}>
        <Col xs={6} sm={4} md={3} lg={2} xl={2}>
          <h5>Start Date</h5>
        </Col>
        <Col xs={8} sm={8} md={9} lg={3} xl={2}>
          <input
            style={{ paddingTop: '0px', paddingBottom: '0px' }}
            type='date'
            name='arrivaldate'
            onChange={props.handleStartDate}
          />
        </Col>
        <Col xs={6} sm={4} md={3} lg={2} xl={1}>
                    Availability
        </Col>
        <Col xs={6} sm={8} md={9} lg={1} xl={1}>
          <input
            type='checkbox'
            value='available'
            checked={props.availableChecked}
            onChange={props.handleCheckbox}
          />
        </Col>
        <Col xs={6} sm={4} md={3} lg={2} xl={1}>
                    Occupancy
        </Col>
        <Col xs={6} sm={8} md={2} lg={1} xl={1}>
          <input
            type='checkbox'
            value='occupied'
            checked={props.occupiedChecked}
            onChange={props.handleCheckbox}
          />
        </Col>
      </Row>
    </Col>
  )
}

export default DeatiledSubmit
