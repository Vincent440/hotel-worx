import React from 'react';
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Dashboard(props) {
    return (
        <Container>
            <Row>
                <Col sm={2}>
                    <InfoPart setApplogout={props.setAppLogout} />
                </Col>
                <Col sm={10}>
                    <div>
                        <div className="btn-group" style={{ display: 'block' }}>
                            <Card style={{ marginBottom: "10px" }}>
                                <Card.Body>RESERVATION</Card.Body>
                            </Card>
                            <Link className="btn btn-primary btn-lg" to="/reserve/new">New Reservation</Link>
                            <Link className="btn btn-primary btn-lg" to="/reserve/allreservations">Update Reservation</Link>
                            <Link className="btn btn-primary btn-lg" to="/reserve/testUpdatereservation">Test Update Reservation</Link>
                        </div>
                        <div className="btn-group" style={{ display: 'block' }}>
                            <Card style={{ marginBottom: "10px" }}>
                                <Card.Body>FRONT DESK</Card.Body>
                            </Card>
                            <Link className="btn btn-primary btn-lg" to="/frontdesk/arrivals">Arrivals</Link>
                            <Link className="btn btn-primary btn-lg" to="/frontdesk/inhouse">In-House Guests</Link>
                        </div>
                        <div className="btn-group" style={{ display: 'block' }}>
                            <Card style={{ marginBottom: "10px" }}>
                                <Card.Body>FINANCE</Card.Body>
                            </Card>
                            <Link className="btn btn-primary btn-lg" to="/cashiering/billing">Billing</Link>
                            <Link className="btn btn-primary btn-lg" to="/cashiering/payment">Test Invoice</Link>
                        </div>
                        <div className="btn-group" style={{ display: 'block' }}>
                            <Card style={{ marginBottom: "10px" }}>
                                <Card.Body>REPORTS</Card.Body>
                            </Card>
                            <Link className="btn btn-primary btn-lg" to="/reports/housekeeping">Housekeeping Report</Link>
                            <Link className="btn btn-primary btn-lg" to="/reports/detailedAvailability">Detailed Availability</Link>
                            <Link className="btn btn-primary btn-lg" to="/reports/houseStatus">House Status</Link>
                        </div>
                        <div style={{ clear: "both" }}></div>

                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard;

