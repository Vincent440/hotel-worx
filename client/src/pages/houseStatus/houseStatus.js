import React, { Component } from "react";
import api from '../../utils/api';
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header"
import { Container, Table } from 'react-bootstrap';
import Particles from "react-particles-js";

const particleOpt = { particles: { number: { value: 120, density: { enable: true, value_area: 1000 } } } };

class HouseStatus extends Component {
    // Setting the initial values of this.state.username and this.state.password
    state = {
        name: "",
        lastname: "",
        phonenumber: "",
        address: {
            street: "",
            state: "",
            city: "",
            zipcode: ""
        },
        arrivaldate: "",
        departuredate: "",
        nights: "",
        adults: "",
        noOfRooms: "",
        roomType: "",
        creditCard: "",
        expirationDate: "",
        selectedOption: ["Two Quenns", "King Single", "Suite"],
        ReservationInfo: {},
        RoomInfo: []
    };
    componentDidMount() {
        api.getReservation(1)
            .then(res => this.setState({ ReservationInfo: res.resCust.result[0], RoomInfo: res.resRooms.result }))
            .catch(err => console.log(err))
    }
    handleChange = selectedOption => {
        this.setState({ selectedOption });
    }

    // handle any changes to the input fields
    handleInputChange = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { name, value } = event.target;

        // Set the state for the appropriate input field
        this.setState({
            [name]: value
        });
    }

    // When the form is submitted, prevent the default event and alert the username and password
    handleFormSubmit = event => {
        event.preventDefault();
        alert(`Username: ${this.state.username}\nPassword: ${this.state.password}`);
        this.setState({ username: "", password: "" });
    }
    render() {
        return (

            <Container>
                <Particles params={particleOpt} id="particul" />

                <Row>
                    <Col xs={12} sm={12} md={2} lg={2} xl={2}>
                        <InfoPart user={this.props.user} logout={this.props.logout} />
                    </Col>
                    <Col xs={12} sm={12} md={10} lg={10} xl={10}>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Header>HOUSE STATUS</Header>
                            </Col>
                        </Row>
                        <div id="resHouse">
                            <Row>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <Row id="headTop">
                                        Room Summary
                                                </Row>
                                    <Row id="rowHouse">
                                        Total Rooms to Sell: {}
                                    </Row>
                                    <Row id="rowHouse">
                                        Min. Available Tonight:{}
                                    </Row>
                                    <Row id="rowHouse">
                                        Max. Occupied Tonight:{}
                                    </Row>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <Row id="headTop">
                                        Activity
                                            </Row>
                                    <Row id="rowHouse">
                                        Stayovers: {}
                                    </Row>
                                    <Row id="rowHouse">
                                        Departures Expected: {}
                                    </Row>
                                    <Row id="rowHouse">
                                        Departures Actual: {}
                                    </Row>
                                    <Row id="rowHouse">
                                        Arrivals Expected: {}
                                    </Row>
                                    <Row id="rowHouse">
                                        Arrivals Actual: {}
                                    </Row>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <Row id="headTop">
                                        Room Status-Housekeeping 
                                                </Row>
                                    <Row id="rowHouse2">
                                        <Col xs={3} sm={3} md={2} lg={4} xl={4}>
                                        </Col>
                                        <Col xs={3} sm={3} md={2} lg={4} xl={4}>
                                            Vacant
                                                </Col>
                                        <Col xs={3} sm={3} md={2} lg={4} xl={4}>
                                            Occupied
                                                </Col>
                                    </Row>
                                    <Row id="rowHouse2">
                                        <Col xs={3} sm={3} md={2} lg={4} xl={4}>
                                            Clean
                                                </Col>
                                        <Col xs={3} sm={3} md={2} lg={4} xl={4}>
                                            vacantClean
                                                    </Col>
                                        <Col xs={3} sm={3} md={2} lg={4} xl={4}>
                                            occupiedClean
                                                </Col>
                                    </Row>
                                    <Row id="rowHouse2">
                                        <Col xs={3} sm={3} md={2} lg={4} xl={4}>
                                            Dirty
                                                     </Col>
                                        <Col xs={3} sm={3} md={2} lg={4} xl={4}>
                                            vacantDirty
                                                </Col>
                                        <Col xs={3} sm={3} md={2} lg={4} xl={4}>
                                            occupiedDirty
                                                </Col>
                                    </Row>

                                </Col>
                            </Row>
                            <div id="dateRow">
                                <tr >
                                    <td>Date</td>
                                    <td>
                                        <input style={{ width: "150px", height: "30px" }}
                                            type="date"
                                            name="arrivaldate"
                                            value={this.state.arrivaldate}
                                            onChange={this.handleInputChange}
                                        />
                                    </td>
                                </tr>
                            </div>

                            <div id="buttonDiv">
                                <button type="button" className="btn btn-primary" style={{ marginLeft: "450px" }}>Search</button>

                                <button type="button" className="btn btn-primary" style={{ marginLeft: "20px" }}>Close</button>

                            </div>
                        </div>
                    </Col>
                </Row>
            </Container >
        )
    }
}

export default HouseStatus;
