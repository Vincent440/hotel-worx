import React, { Component } from "react";
import api from '../../utils/api';
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import moment from "moment";
import Header from "../../components/Header"
import { Container } from 'react-bootstrap';
import Particles from "react-particles-js";

const particleOpt = { particles: { number: { value: 120, density: { enable: true, value_area: 1000 } } } };

const today = moment().format("YYYY-MM-DD");

class HouseStatus extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    state = {
        date: today,
        roomsToSell: "",
        minAvailableTonight: "",
        maxOccupiedTonight: "",
        stayovers: "",
        departuresExpected: "",
        departuresActual: "",
        arrivalsExpected: "",
        arrivalsActual: "",
        cleanVacant: "",
        cleanOccupied: "",
        dirtyVacant: "",
        dirtyOccupied: ""
    };

    makeAxiosCall = () => {
        api.getHouseStatus(this.state.date)
            .then(res => this.setState({ roomsToSell: res.rooms[0].roomsToSell, cleanVacant: res.rooms[0].cleanVacant, cleanOccupied: res.rooms[0].cleanOccupied, dirtyVacant: res.rooms[0].dirtyVacant,dirtyOccupied: res.rooms[0].dirtyOccupied, stayovers: res.res_rooms[0].stayovers, departuresExpected: res.res_rooms[0].departuresExpected, departuresActual: res.res_rooms[0].departuresActual, arrivalsExpected: res.res_rooms[0].arrivalsExpected, arrivalsActual: res.res_rooms[0].arrivalsActual, minAvailableTonight: Number(res.rooms[0].roomsToSell)-Number(res.res_rooms[0].stayovers)-Number(res.res_rooms[0].arrivalsExpected), maxOccupiedTonight: Number(res.res_rooms[0].stayovers)+Number(res.res_rooms[0].arrivalsExpected) }))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.makeAxiosCall();
    }

    handleDateChange = event => {
        this.setState({
            date: event.target.value
        });
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.makeAxiosCall();
    }

    render() {
        return (

            <Container>
                <Particles params={particleOpt} id="particul" />

                <Row>
                    <Col xs={12} sm={12} md={2} lg={2} xl={2}>
                        <InfoPart />
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
                                    <Row className="headTop">Room Summary</Row>
                                    <Row className="rowHouse">Total Rooms to Sell: {this.state.roomsToSell}</Row>
                                    <Row className="rowHouse">Min. Available Tonight: {this.state.minAvailableTonight}</Row>
                                    <Row className="rowHouse">Max. Occupied Tonight: {this.state.maxOccupiedTonight}</Row>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <Row className="headTop">Activity</Row>
                                    <Row className="rowHouse">Stayovers: {this.state.stayovers}</Row>
                                    <Row className="rowHouse">Departures Expected: {this.state.departuresExpected}</Row>
                                    <Row className="rowHouse">Departures Actual: {this.state.departuresActual}</Row>
                                    <Row className="rowHouse">Arrivals Expected: {this.state.arrivalsExpected}</Row>
                                    <Row className="rowHouse">Arrivals Actual: {this.state.arrivalsActual}</Row>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <Row className="headTop">Room Status-Housekeeping</Row>
                                    <Row className="rowHouse2">
                                        <Col xs={3} sm={3} md={2} lg={4} xl={4}></Col>
                                        <Col xs={3} sm={3} md={2} lg={4} xl={4}>Vacant</Col>
                                        <Col xs={3} sm={3} md={2} lg={4} xl={4}>Occupied</Col>
                                    </Row>
                                    <Row className="rowHouse2">
                                        <Col xs={3} sm={3} md={2} lg={4} xl={4}>Clean</Col>
                                        <Col xs={3} sm={3} md={2} lg={4} xl={4}>{this.state.cleanVacant}</Col>
                                        <Col xs={3} sm={3} md={2} lg={4} xl={4}>{this.state.cleanOccupied}</Col>
                                    </Row>
                                    <Row className="rowHouse2">
                                        <Col xs={3} sm={3} md={2} lg={4} xl={4}>Dirty</Col>
                                        <Col xs={3} sm={3} md={2} lg={4} xl={4}>{this.state.dirtyVacant}</Col>
                                        <Col xs={3} sm={3} md={2} lg={4} xl={4}>{this.state.dirtyOccupied}</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <div id="dateRow">
                                <Row>
                                    <Col>Date: 
                                        <input className="ml-2" style={{ width: "150px", height: "30px" }}
                                            type="date"
                                            name="date"
                                            value={this.state.date}
                                            onChange={this.handleDateChange}
                                        />
                                    </Col>
                                </Row>
                            </div>

                            <div id="buttonDiv">
                                <button type="button" className="btn btn-primary" style={{ marginLeft: "450px" }} onClick={this.handleFormSubmit}>Search</button>

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
