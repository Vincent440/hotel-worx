import React from 'react';
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart"
import { Card, Button } from 'react-bootstrap';


function Dashboard() {
    return (

        <Row id="dashboardTable">
            <InfoPart />
            <Col sm={10}>
                <div>
                    <div>

                        <div className="btn-group" style={{ display: 'block' }}>
                            <Card style={{ marginBottom: "10px" }}>
                                <Card.Body style={{ textAlign: "center", fontSize: "24px" }}>RESERVATION</Card.Body>
                            </Card>
                            <Button variant="primary" size="lg" href="/reserve/new">New Reservation</Button>
                            <Button variant="primary" size="lg" href="/reserve/allreservations">Update Reservation</Button>
                            <Button variant="primary" size="lg" href="/reserve/testreservation">Test Reservation Confirm</Button>
                            <Button variant="primary" size="lg" href="/reserve/testUpdatereservatio">Test Update Reservation</Button>
                        </div>
                    </div>
                    <div className="btn-group" style={{ display: 'block' }}>
                        <Card style={{ marginBottom: "10px" }}>
                            <Card.Body style={{ textAlign: "center", fontSize: "24px" }}>FRONT DESK</Card.Body>
                        </Card>
                        <Button variant="primary" size="lg" href="/frontdesk/arrivals">Arrivals</Button>
                        <Button variant="primary" size="lg" href="/frontdesk/inhouse">In-House Guests</Button>
                    </div>
                    <div className="btn-group" style={{ display: 'block' }}>
                        <Card style={{ marginBottom: "10px" }}>
                            <Card.Body style={{ textAlign: "center", fontSize: "24px" }}>FINANCE</Card.Body>
                        </Card>
                        <Button variant="primary" size="lg" href="/cashiering/billing">Billing</Button>
                        <Button variant="primary" size="lg" href="/cashiering/oayment">Test Invoice</Button>
                    </div>
                    <div className="btn-group" style={{ display: 'block' }}>
                        <Card style={{ marginBottom: "10px" }}>
                            <Card.Body style={{ textAlign: "center", fontSize: "24px" }}>REPORTS</Card.Body>
                        </Card>
                        <Button variant="primary" size="lg" href="/reports/housekeeping">Housekeeping Report</Button>
                        <Button variant="primary" size="lg" href="/reports/detailedAvailability">Detailed Availability</Button>
                        <Button variant="primary" size="lg" href="/reports/houseStatu">House Status</Button>
                    </div>
                    <div style={{ clear: "both" }}></div>

                </div>
            </Col>
        </Row>
    )
}

export default Dashboard;

