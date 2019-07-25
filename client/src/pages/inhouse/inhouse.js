import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import Header from "../../components/Header"
import SearchSubmit from "../../components/searchButton";
import Table from 'react-bootstrap/Table';
import api from '../../utils/api';
import { Redirect } from "react-router-dom";

class Inhouse extends Component {
    state = {
        arrivaldate: "",
        departuredate: "",
        firstname: undefined,
        lastname: undefined,
        roomNumber: undefined,
        confirmationNumber: undefined,
        reservationChosen: false,
        chosenReservationId: "",
        guestsArray: []
    };

    makeAxiosCall = () => {
        const criteria = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            roomNumber: this.state.roomNumber,
            confirmationNumber: this.state.confirmationNumber
        };
        api.getGuests(criteria)
            .then(res => this.setState({ guestsArray: res }))
            .catch(err => console.log(err));
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.makeAxiosCall();
    }

    handleChosenReservation = id => {
        this.setState({ reservationChosen: true, chosenReservationId: id });
    }

    printFunction() {
        window.print();
    }

    render() {
        if (this.state.reservationChosen) {
            localStorage.setItem('reservation_id', this.state.chosenReservationId);
            return (
                <Redirect to={{
                    pathname: '/reserve/testUpdatereservation'
                }} />
            )
        }

        return (
            <div>
                <Row>
                    <Col xl={12}>
                        <Header>IN-HOUSE GUESTS</Header>
                    </Col>
                </Row>
                <div id="res" style={{ paddingBottom: "10px" }}>
                    <Row>
                        <Col xl={9}>
                            <Row style={{ marginTop: "5px" }}>
                                <Col xs={6} sm={6} md={2} lg={2} xl={2}>
                                    Room
                            </Col>
                                <Col xs={6} sm={6} md={10} lg={3} xl={3}>
                                    <input
                                        id=""
                                        name="roomNumber"
                                        placeholder="Room Number"
                                        value={this.state.roomNumber}
                                        onChange={this.handleInputChange}
                                    />
                                </Col>
                                <Col xs={6} sm={6} md={2} lg={2} xl={2}>
                                    Confirmation No
                            </Col>
                                <Col xs={6} sm={6} md={10} lg={3} xl={3}>
                                    <input
                                        type="tel"
                                        placeholder="Confirmation Number"
                                        name="confirmationNumber"
                                        value={this.state.confirmationNumber}
                                        onChange={this.handleInputChange}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ paddingTop: "5px" }}>
                                <Col xs={6} sm={6} md={2} lg={2} xl={2}>
                                    First Name
                            </Col>
                                <Col xs={6} sm={6} md={10} lg={3} xl={3}>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        name="firstname"
                                        value={this.state.firstname}
                                        onChange={this.handleInputChange}
                                    />
                                </Col>
                                <Col xs={6} sm={6} md={2} lg={2} xl={2}>
                                    Last Name
                            </Col>
                                <Col xs={6} sm={6} md={10} lg={3} xl={2}>
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        name="lastname"
                                        value={this.state.lastname}
                                        onChange={this.handleInputChange}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2} xl={1}>
                            <SearchSubmit handleFormSubmit={this.handleFormSubmit} />
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={2} xl={1}>
                            <button type="button" className="btn btn-success" id="printButton2" onClick={this.printFunction}>Print</button>
                        </Col>
                    </Row>
                </div>
                <div id="res2">
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
                                    </tr>
                                    {this.state.guestsArray.map((guest, i) => (
                                            <tr key={guest.res_room_id} onClick={() => this.handleChosenReservation(guest.reservation_id)}>
                                                <td>{guest.first_name} {guest.last_name}</td>
                                                <td>{guest.check_in_date}</td>
                                                <td>{guest.check_out_date}</td>
                                                <td>{guest.type}</td>
                                                <td>{guest.room_num}</td>
                                            </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row >
                </div>
            </div>
        )
    }

}

export default Inhouse;