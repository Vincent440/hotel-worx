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

class Arrivals extends Component {
    state = {
        startDateRange: today,
        firstname: undefined,
        lastname: undefined,
        confirmationNumber: undefined,
        arrivalsArray: [],
        roomsArray: []
    };

    makeAxiosCall = () => {
        const criteria = {
            startDateRange: moment(this.state.startDateRange).format('YYYY-MM-DD'),
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            confirmationNumber: this.state.confirmationNumber
        };

        api.getArrivalsNew(criteria, moment(this.state.startDateRange).format('YYYY-MM-DD'))
            .then(res => this.setState({ arrivalsArray: res.arrivals, roomsArray: res.rooms_arrivals }))
            .catch(err => console.log(err));

        // api.getArrivals(criteria)
        //     .then(res => this.setState({ arrivalsArray: res }))
        //     .catch(err => console.log(err));

        // api.getRoomsArrivals(moment(this.state.startDateRange).format('YYYY-MM-DD'))
        //     .then(res => this.setState({ roomsArray: res }))
        //     .catch(err => console.log(err));
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
                    <Col sm={2}>
                        <InfoPart user={this.props.user} logout={this.props.logout} />
                    </Col>
                    <Col sm={10}>
                        <Row>
                            <Col xl={12}>
                                <Header>ARRIVALS</Header>
                            </Col>
                        </Row>
                        <div id="res" style={{ paddingBottom: "10px" }}>
                            <Row>
                                <Col xl={10}>
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
                                        <Col xl={1}>Name:</Col>
                                        <Col xl={2}>
                                            <input style={{ width: "150px" }}
                                                type="text"
                                                placeholder="First Name"
                                                name="firstname"
                                                value={this.state.firstname}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                        <Col xl={2}>Last Name:</Col>
                                        <Col xl={3}>
                                            <input style={{ width: "150px", height: "30px" }}
                                                type="text"
                                                placeholder="Last Name"
                                                name="lastname"
                                                value={this.state.lastname}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                        <Col xl={1}>
                                            <SearchSubmit handleFormSubmit={this.handleFormSubmit} />
                                        </Col>
                                    </Row>
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
                                                                {this.state.roomsArray.filter(roomtype => roomtype.room_type_id === arrival.room_type_id).map(room => (
                                                                    <option key={room.room_id} value={room.room_id}>{room.room_num}</option>
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

export default Arrivals;
