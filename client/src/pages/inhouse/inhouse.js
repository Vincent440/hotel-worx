import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header"
import SearchSubmit from "../../components/searchButton";
import { Container, Table } from 'react-bootstrap';
import api from '../../utils/api';

class Inhouse extends Component {
    state = {
        arrivaldate: "",
        departuredate: "",
        firstname: undefined,
        lastname: undefined,
        roomNumber: undefined,
        confirmationNumber: undefined,
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

    render() {
        return (
            <Container>
                <Row>
                    <Col sm={2}>
                        <InfoPart user={this.props.user} logout={this.props.logout} />
                    </Col>
                    <Col sm={10}>
                        <Row>
                            <Col xl={12}>
                                <Header>IN-HOUSE GUESTS</Header>
                            </Col>
                        </Row>
                        <div id="res" style={{ paddingBottom: "10px" }}>
                            <Row>
                                <Col xl={10}>
                                    <Row style={{ marginTop: "5px" }}>
                                        <Col xl={1}>
                                            Room
                                        </Col>
                                        <Col xl={3} style={{ marginRight: "32px" }}>
                                            <input
                                                id=""
                                                name="roomNumber"
                                                placeholder="Room Number"
                                                value={this.state.roomNumber}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                        <Col xl={3} style={{ paddingLeft: "23px", marginRight: "-17px" }}>
                                            Confirmation Number
                                        </Col>
                                        <Col xl={1} style={{ paddingLeft: "-25px" }}>
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
                                        <Col xl={1}>
                                            First Name
                                        </Col>
                                        <Col xl={3} style={{ marginRight: "35px" }}>
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                name="firstname"
                                                value={this.state.firstname}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                        <Col xl={3} style={{ paddingLeft: "31px", marginRight: "-20px" }}>
                                            Last Name
                                        </Col>
                                        <Col xl={2} style={{ paddingLeft: "-25px" }}>
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
                                <Col xl={2} style={{ paddingTop: "25px", Left: "30px" }}>
                                    <Col xl={12}>
                                        <SearchSubmit handleFormSubmit={this.handleFormSubmit} />
                                    </Col>
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
                                            </tr>
                                            {this.state.guestsArray.map((guest, i) => (
                                                <tr key={guest.res_room_id}>
                                                    <td>{guest.last_name}, {guest.first_name}</td>
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
                    </Col>
                </Row >
            </Container >
        )
    }

}

export default Inhouse;