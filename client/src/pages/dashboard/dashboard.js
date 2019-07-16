import React from 'react';
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Particles from "react-particles-js";
import checkinLogo from "././images/checkin.png";
import housekeepingLogo from "./images/maid.png";
import inhouseLogo from "./images/bed.png";
import bookingLogo from "./images/hotel.png";
import updateLogo from "./images/update.png";
import billingLogo from "./images/bill.png";
import detailedLogo from "./images/report.png";
import houseLogo from "./images/communications.png";
// import maintanceLogo from "./maintanceLogo";

const particleOpt = { particles: { number: { value: 120, density: { enable: true, value_area: 1000 } } } };

function Dashboard(props) {
    return (
        <Container>
            <Particles params={particleOpt} id="particul" />

            <Row>
                <Col sm={2}>
                    <InfoPart user={props.user} logout={props.logout} />
                </Col>
                <Col sm={10}>
                    <Row>
                        <Col xs={12} sm={12} md={6} lg={3} xl={3}>
                            <div className="btn-group" style={{ display: 'block' }}>
                                <Card style={{ marginBottom: "10px" }}>
                                    <Card.Body>RESERVATION</Card.Body>
                                </Card>
                                <Link className="btn btn-primary" id="dashboardLink" to="/reserve/new">
                                    <img id="bookingLogo" alt="bookingLogo" src={bookingLogo} />
                                    New Reservation</Link>
                                <Link className="btn btn-primary" id="dashboardLink" to="/reserve/allreservations">
                                    <img id="updateLogo" alt="updateLogo" src={updateLogo} />
                                    Update Reservation</Link>
                                <Link className="btn btn-primary" id="dashboardLink" to="/reserve/testUpdatereservation">
                                    Test Update Reservation</Link>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={3} xl={3}>
                            <div className="btn-group" style={{ display: 'block' }}>
                                <Card style={{ marginBottom: "10px" }}>
                                    <Card.Body>FRONT DESK</Card.Body>
                                </Card>
                                <Link className="btn btn-primary" id="dashboardLink" to="/frontdesk/arrivals">
                                    <img id="checkin" alt="checkin" src={checkinLogo} />
                                    Arrivals
                                    </Link>
                                <Link className="btn btn-primary" id="dashboardLink" to="/frontdesk/inhouse">
                                    <img id="inhouseLogo" alt="inhouseLogo" src={inhouseLogo} />
                                    In-House Guests</Link>
                                {/* <Link className="btn btn-primary" to="/frontdesk/maintance">
                                    <img id="maintanceLogo" alt="maintanceLogo" src={maintanceLogo} />
                                    Maintance</Link> */}
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={3} xl={3}>
                            <div className="btn-group" style={{ display: 'block' }}>
                                <Card style={{ marginBottom: "10px" }}>
                                    <Card.Body>FINANCE</Card.Body>
                                </Card>
                                <Link className="btn btn-primary" id="dashboardLink" to="/cashiering/billing">
                                    <img id="billingLogo" alt="billingLogo" src={billingLogo} />
                                    Billing</Link>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={3} xl={3}>
                            <div className="btn-group" style={{ display: 'block' }}>
                                <Card style={{ marginBottom: "10px" }}>
                                    <Card.Body>REPORTS</Card.Body>
                                </Card>
                                <Link className="btn btn-primary" id="dashboardLink" to="/reports/housekeeping">
                                    <img id="housekeepingLogo" alt="housekeepingLogo" src={housekeepingLogo} />
                                    Housekeeping Report
                                </Link>
                                <Link className="btn btn-primary" id="dashboardLink" to="/reports/detailedAvailability">
                                    <img id="detailedLogo" alt="detailedLogo" src={detailedLogo} />
                                    Detailed Availability
                                    </Link>
                                <Link className="btn btn-primary" id="dashboardLink" to="/reports/houseStatus">
                                    <img id="houseLogo" alt="houseLogo" src={houseLogo} />
                                    House Status</Link>
                            </div>
                        </Col>
                        <div style={{ clear: "both" }}></div>

                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard;

