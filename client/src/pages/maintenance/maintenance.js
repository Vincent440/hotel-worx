import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header";
import SearchSubmit from "../../components/searchButton";
import api from '../../utils/api';
import moment from "moment";
import { Container, Table } from 'react-bootstrap';
import { isInclusivelyBeforeDay } from 'react-dates';
import Particles from "react-particles-js";

const particleOpt = { particles: { number: { value: 120, density: { enable: true, value_area: 1000 } } } };
const today = moment().format("YYYY-MM-DD");

class Maintenance extends Component {
    state = {
        startDateRange: today,
        firstname: undefined,
        lastname: undefined,
        confirmationNumber: undefined,
        arrivalsArray: [],
        roomsArray: [],
        pendingArray: []
    };

    makeAxiosCall = () => {
        const criteria = {
            startDateRange: moment(this.state.startDateRange).format('YYYY-MM-DD'),
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            confirmationNumber: this.state.confirmationNumber
        };

        api.getArrivalsNew(criteria, moment(this.state.startDateRange).format('YYYY-MM-DD'))
            .then(res => this.setState({ arrivalsArray: res.arrivals, roomsArray: res.rooms_arrivals, pendingArray: res.pending_departures }))
            .catch(err => console.log(err));
    }

    handleCheckIn = (id, room_id) => {
        api.updateRoomCheckin(id, room_id)
            .then(res => this.makeAxiosCall())
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.makeAxiosCall();
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleRoomChange = event => {
        const { id, value } = event.target;
        console.log(id, value);
        let arrivalsArray = [...this.state.arrivalsArray];
        arrivalsArray[id].selectedRoom = value;
        this.setState({ arrivalsArray });
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
                <Col xs={6} sm={4} md={3} lg={3} xl={2}>
                        <InfoPart user={this.props.user} logout={this.props.logout} />
                    </Col>
                    <Col xs={6} sm={8}md={9} lg={9} xl={10}>
                        <Row>
                            <Col xl={12}>
                                <Header>MAINTENANCE</Header>
                            </Col>
                        </Row>
                        <div id="res" style={{ paddingBottom: "10px" }}>
                            <Row>
                                <Col xl={12}>
                                    <Row>
                                        <Col xl={1}>Date</Col>
                                        <Col xl={2}>
                                            <input style={{ width: "150px", height: "30px" }}
                                                type="date"
                                                placeholder="Date"
                                                name="startDateRange"
                                                value={this.state.startDateRange}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                        <Col sm={2} >Room Number</Col>
                                        <Col sm={4}>
                                            <input style={{ width: "150px" }}
                                                id=""
                                                onChange={this.handleInputChange}
                                                name="roomNumber"
                                                placeholder="Room Number"
                                                value={this.state.roomNumber}
                                            />
                                        </Col>
                                        <Col xl={1}>
                                            <SearchSubmit handleFormSubmit={this.handleFormSubmit} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                        <div id="res" style={{ paddingBottom: "10px" }}>
                            <Row>
                                <Col xl={12}>
                                    Pending departures by room type:
                                    {this.state.pendingArray.length === 0 ? " None" :
                                        (this.state.pendingArray.map((type, i) => (
                                            <span key={type.room_type_id}> {i>0 ? ", " : ""}({type.type}: {type.pending_departures})</span>
                                        )))
                                    }
                                </Col>
                            </Row>
                        </div>
                        <div id="res">
                            <Row style={{ paddingTop: "5px", paddingBottom: "5px" }}>
                                <Col xl={12}>
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <th>Name</th>
                                                <th>Arrival Date</th>
                                                <th>Departure Date</th>
                                                <th>Room Type</th>
                                                <th>Room Number</th>
                                                <th></th>
                                            </tr>
                                            {this.state.arrivalsArray.map((arrival, i) => (
                                                <tr key={arrival.res_room_id}>
                                                    <td>{arrival.name}</td>
                                                    <td>{arrival.check_in_date}</td>
                                                    <td>{arrival.check_out_date}</td>
                                                    <td>{arrival.type}</td>
                                                    <td>
                                                        {this.state.startDateRange === today ? (arrival.room_num === "Not Set" ?
                                                            <select id={i} onChange={this.handleRoomChange}>
                                                                <option value="">Select a room</option>
                                                                {this.state.roomsArray.filter(roomtype => (roomtype.room_type_id === arrival.room_type_id && roomtype.occupied === 0)).map(room => (
                                                                    <option key={room.room_id} value={room.room_id}>{room.room_num} {room.clean === 0 ? " (dirty)" : ""}</option>
                                                                ))}
                                                            </select> :
                                                            arrival.room_num) : "Not Set"}
                                                    </td>
                                                    <td>
                                                        {this.state.startDateRange === today ? arrival.checked_in === 0 ? <button onClick={() => this.handleCheckIn(arrival.res_room_id, this.state.arrivalsArray[i].selectedRoom)}>Check In</button> : "Checked In" : ""}

                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row >
                        </div>
                    </Col>
                </Row >
            </Container >
        )
    }
}

export default Maintenance;
