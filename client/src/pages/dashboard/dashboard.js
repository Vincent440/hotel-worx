import React from 'react';
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart"
import { Card, Button, Container } from 'react-bootstrap';


function Dashboard() {
    return (
        <Container>
            <Row>
                <Col sm={2}>
                    <InfoPart />
                </Col>
                <Col sm={10}>
                    <div>
                        <div className="btn-group" style={{ display: 'block' }}>
                            <Card style={{ marginBottom: "10px" }}>
                                <Card.Body>RESERVATION</Card.Body>
                            </Card>
                            <Button variant="primary" size="lg" href="/reserve/new">New Reservation</Button>
                            <Button variant="primary" size="lg" href="/reserve/allreservations">Update Reservation</Button>
                            <Button variant="primary" size="lg" href="/reserve/testreservation">Test Reservation Confirm</Button>
                            <Button variant="primary" size="lg" href="/reserve/testUpdatereservation">Test Update Reservation</Button>
                        </div>
                        <div className="btn-group" style={{ display: 'block' }}>
                            <Card style={{ marginBottom: "10px" }}>
                                <Card.Body>FRONT DESK</Card.Body>
                            </Card>
                            <Button variant="primary" size="lg" href="/frontdesk/arrivals">Arrivals</Button>
                            <Button variant="primary" size="lg" href="/frontdesk/inhouse">In-House Guests</Button>
                        </div>
                        <div className="btn-group" style={{ display: 'block' }}>
                            <Card style={{ marginBottom: "10px" }}>
                                <Card.Body>FINANCE</Card.Body>
                            </Card>
                            <Button variant="primary" size="lg" href="/cashiering/billing">Billing</Button>
                            <Button variant="primary" size="lg" href="/cashiering/payment">Test Invoice</Button>
                        </div>
                        <div className="btn-group" style={{ display: 'block' }}>
                            <Card style={{ marginBottom: "10px" }}>
                                <Card.Body>REPORTS</Card.Body>
                            </Card>
                            <Button variant="primary" size="lg" href="/reports/housekeeping">Housekeeping Report</Button>
                            <Button variant="primary" size="lg" href="/reports/detailedAvailability">Detailed Availability</Button>
                            <Button variant="primary" size="lg" href="/reports/houseStatus">House Status</Button>
                        </div>
                        <div style={{ clear: "both" }}></div>

                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard;

