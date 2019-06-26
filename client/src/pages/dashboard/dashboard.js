import React from 'react';
import { Row, Col } from 'react-grid-system';
import "./style.css";
import logo from './solidcolor.png';
import MyComponent from "../../components/calendar"



function Dashboard() {
    return (

        <Row id="dashboardTable">
            <Col sm={2} id="infoPart">
                <img src={logo} className="App-logo" id="logo" alt="logo" />
                <h5>User Name</h5><br></br>
                <MyComponent></MyComponent><br></br>
                <h5>Weather</h5><br></br>
                <i className="fa fa-gear" style={{ fontSize: '28px' }} />
            </Col>
            <Col sm={10}>
                <div>
                    <div className="btn-group" style={{ display: 'block' }}>
                        <a><h5>RESERVATION</h5></a>
                        <a className="btn" href="/reserve/new">New Reservation</a>
                        <a className="btn" href="/reserve/allreservations">Update Reservation</a>
                        <a className="btn" href="/reserve/testreservation">Test Reservation Confirm</a>
                        <a className="btn" href="/reserve/testUpdatereservation">Test Update Reservation</a>
                    </div>
                    <div className="btn-group" style={{ display: 'block' }}>
                        <a><h5>FRONT DESK</h5></a>
                        <a className="btn" href="/frontdesk/arrivals">Arrivals</a>
                        <a className="btn" href="/frontdesk/inhouse">In-House Guests</a>
                    </div>
                    <div className="btn-group" style={{ display: 'block' }}>
                        <a><h5>CASHIERING</h5></a>
                        <a className="btn" href="/cashiering/billing">Billing</a>
                        <a className="btn" href="/cashiering/payment">Test Invoice</a>
                    </div>
                    <div className="btn-group" style={{ display: 'block' }}>
                        <a><h5>REPORTS</h5></a>
                        <a className="btn" href="/reports/housekeeping">Housekeeping Report</a>
                        <a className="btn" href="/reports/detailedAvailability">Detailed Availability</a>
                        <a className="btn" href="/reports/houseStatus">House Status</a>
                    </div>
                    <div style={{ clear: "both" }}></div>

                </div>
            </Col>
        </Row>
    )
}

export default Dashboard;

