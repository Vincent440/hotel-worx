import React from "react";
import "./style.css";
import SearchSubmit from "../searchButton";
import { Row, Col } from 'react-grid-system';


const DeatiledSubmit = props => {
    return (
        <Col xl={12}>
            <Row>
                <Col xl={10}>
                    <Row>
                        <Col xl={2}>
                            <h2> Start Date</h2>
                        </Col>
                        <Col xl={3} ><input
                            style={{ paddingTop: "0px", paddingBottom: "0px" }}
                            type="date"
                            name="arrivaldate"
                            onChange={props.handleStartDate}
                        />
                        </Col>
                        <Col xl={1}>
                            Availability
                        </Col>
                        <Col xl={1}>
                            <input type="radio" id="myCheck" checked/>
                        </Col>
                        <Col xl={1}>
                            Occupancy
                        </Col>
                        <Col xl={1}>
                            <input type="radio" id="myCheck"  />
                        </Col>
                    </Row>
                </Col>
                <Col xl={2}>
                    <SearchSubmit handleFormSubmit={props.handleFormSubmit} />
                </Col>
            </Row>
        </Col >

    )
}



export default DeatiledSubmit;