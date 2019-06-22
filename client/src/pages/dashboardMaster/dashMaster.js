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
                        <button ><h5>RESERVATION</h5></button>
                        <button >New Reservation</button>
                        <button >Update Reservation</button>
                    </div>
                    <div className="btn-group" style={{ display: 'block' }}>
                        <button><h5>FRONT DESK</h5></button>
                        <button>Arrivals</button>
                        <button>In-House Guests</button>
                        <button>Departures</button>
                    </div>
                    <div className="btn-group" style={{ display: 'block' }}>
                        <button><h5>CASHIERING</h5></button>
                        <button>Billing</button>
                    </div>
                    <div className="btn-group" style={{ display: 'block' }}>
                        <button><h5>REPORTS</h5></button>
                        <button>Housekeeping Report</button>
                        <button>Detailed Availability</button>
                        <button>House Status</button>
                        <button>Manager Flash Report</button>

                    </div>
                    <div className="btn-group" style={{ display: 'block' }}>
                        <button><h5>CONFIGURATION</h5></button>
                        <button>Create User</button>
                        <button>Update User</button>
                    </div>
                    <div style={{ clear: "both" }}></div>

                </div>
            </Col>
        </Row>
    )
}

export default Dashboard;

