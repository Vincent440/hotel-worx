import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import Select from 'react-select';
import api from '../../utils/api';
import Header from "../../components/Header";
import DateRange from "../../components/dateRange/dateRange";
import { Container, Table } from 'react-bootstrap';
import CreditCardInput from 'react-credit-card-input';
import { cardNumber, expiry, cvc } from 'react-credit-card-input';


// import ButtonSubmit from "../../components/submitButton"


class ReserveNew extends Component {
    state = {
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        arrivaldate: "",
        departuredate: "",
        nights: "",
        adults: "",
        noOfRooms: "",
        RoomTypes: [],
        creditCard: "",
        expirationDate: ""
    };

    // handle any changes to the input fields
    handleInputChange = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { name, value } = event.target;

        // Set the state for the appropriate input field
        this.setState({
            [name]: value
        });
    }
    componentDidMount() {
        api.getRoomTypes()
            .then(res => this.setState({ RoomTypes: res }))
            .catch(err => console.log(err));
    }

    // When the form is submitted, prevent the default event and alert the username and password
    handleFormSubmit = event => {
        event.preventDefault();
        alert(`Username: ${this.state.firstname}\nPassword: ${this.state.lastname}\nPhone: ${this.state.phone}\nEmail: ${this.state.email}\nAddress: ${this.state.address}\nCity: ${this.state.city}\nState: ${this.state.state}\nZip: ${this.state.zip}\nCredit Card #: ${this.state.creditCard}\nExpiration: ${this.state.expirationDate}`);
    }
    render() {
        return (

            <Container>
                <Row>
                    <Col sm={2}>
                        <InfoPart />
                    </Col>
                    <Col sm={10}>
                        <Row>
                            <Col xl={12}>
                                <Header>NEW RESERVATIONS</Header>
                            </Col>
                        </Row>
                        <div id="res" style={{ paddingBottom: "10px" }}>
                            <Row>
                                <Col xl={1}>
                                    Arrival
                                        </Col>
                                <Col xl={6}>
                                    <DateRange />
                                </Col>

                            </Row>
                            <Row style={{ marginTop: "5px" }}>
                                <Col xl={1}>
                                    Nights
                                        </Col>
                                <Col xl={2}>
                                    <input
                                        id=""
                                        type="number"
                                        placeholder="Number of Nights"
                                        name="nights"
                                        value={this.state.nights}
                                        onChange={this.handleInputChange}
                                    />
                                </Col>
                                <Col xl={1}>
                                    No of Rooms
                                        </Col>
                                <Col xl={2}>
                                    <input
                                        type="number"
                                        placeholder="Number of Rooms"
                                        name="roomsnumber"
                                        value={this.state.roomsnumber}
                                        onChange={this.handleInputChange}
                                    />
                                </Col>


                                <Col xl={2}>
                                    Room Type:
                                        </Col>
                                <Col xl={2}>
                                    <select>
                                        {this.state.RoomTypes.map(type => (
                                            <option key="type.room_type_id">{type.type}</option>
                                        ))}
                                    </select>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={1}>
                                    Adults
                                        </Col>
                                <Col xl={2}>
                                    <input
                                        id=""
                                        type="number"
                                        name="adultnumber"
                                        placeholder="Adults"
                                        value={this.state.adultnumber}
                                        onChange={this.handleInputChange}
                                    />
                                </Col>
                                <Col xl={1}>
                                    Rate
                                        </Col>
                                <Col xl={2}>
                                    <input
                                        type="tel"
                                        placeholder="Rate"
                                        name="roomrate"
                                        value={this.state.roomrate}
                                        onChange={this.handleInputChange}
                                    />
                                </Col>
                                <Col xl={2}>
                                    Room Number:
                                        </Col>
                                <Col xl={2}>
                                    <Select />
                                </Col>
                            </Row>
                        </div>

                        <div id="guestinfo">
                            <Row>
                                <Col xl={10}>
                                    <Row>
                                        <Col xl={2}>
                                            First Name
                                        </Col>
                                        <Col xl={3}>
                                            <input
                                                type="text"
                                                placeholder="First Name"
                                                name="firstname"
                                                value={this.state.firstname}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                        <Col xl={2}>
                                            Last Name
                                        </Col>
                                        <Col xl={2}>
                                            <input
                                                type="text"
                                                placeholder="Last Name"
                                                name="lastname"
                                                value={this.state.lastname}
                                                onChange={this.handleInputChange}
                                            /></Col>
                                    </Row>
                                    <Row style={{ marginTop: "5px" }}>
                                        <Col xl={2}>
                                            Phone Number
                                        </Col>
                                        <Col xl={3}>
                                            <input
                                                type="tel"
                                                placeholder="Phone Number"
                                                name="phone"
                                                value={this.state.phone}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                        <Col xl={2}>
                                            Email Address
                                        </Col>
                                        <Col xl={2}>
                                            <input
                                                type="email"
                                                placeholder="Email Address"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.handleInputChange}
                                            /></Col>
                                    </Row>
                                    <Row style={{ marginTop: "5px" }}>
                                        <Col xl={2}>
                                            Address
                                        </Col>
                                        <Col xl={3}>
                                            <input
                                                type="text"
                                                placeholder="Adress"
                                                name="address"
                                                value={this.state.address}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>

                                        <Col xl={2}>
                                            <input
                                                type="text"
                                                placeholder="City"
                                                name="city"
                                                value={this.state.city}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                        <Col xl={2}>
                                            <input
                                                type="text"
                                                placeholder="State"
                                                name="state"
                                                value={this.state.state}
                                                onChange={this.handleInputChange}
                                            /></Col>
                                        <Col xl={1}>
                                            <input
                                                type="text"
                                                placeholder="ZipCode"
                                                name="zip"
                                                value={this.state.zip}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: "5px" }}>
                                        <Col xl={2}>
                                            Credir Card Number
                                        </Col>
                                        <Col xl={10}>
                                            <CreditCardInput
                                                cardNumberInputProps={{ value: cardNumber, onChange: this.handleCardNumberChange }}
                                                cardExpiryInputProps={{ value: expiry, onChange: this.handleCardExpiryChange }}
                                                cardCVCInputProps={{ value: cvc, onChange: this.handleCardCVCChange }}
                                                fieldClassName="input"
                                            /></Col>

                                    </Row>
                                </Col>
                            </Row>
                        </div>


                        {/* <ButtonSubmit handleSubmit={this.handleFormSubmit} /> */}
                        <button type="submit" class="btn btn-primary" style={{ marginLeft: "480px" }} onClick={this.handleFormSubmit}>Submit</button>
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default ReserveNew;