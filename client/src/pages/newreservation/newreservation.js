import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import api from '../../utils/api';
import Header from "../../components/Header";
import DateRange from "../../components/dateRange/dateRange";
import { Container, Table } from 'react-bootstrap';
import CreditCardInput from 'react-credit-card-input';
import { cvc } from 'react-credit-card-input';

// import ButtonSubmit from "../../components/submitButton"
import ButtonSubmit from "../../components/submitButton";

// const test_reservation = { 
//     "cust": ["0first_name", "1last_name", "2address", "3city", "4state", "5zip", "6email", "7phone", "8credit_card_num", "9cc_expiration", "10active"],
//     "reserve": ["0user_id", "1comments"],
//     "rooms": [["0room_type_id", "1check_in_date", "2check_out_date", "2adults", "3confirmation_code", "4comments"]]
// }


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
        expirationDate: "",
        reservationSuccess: false,
        newReservationId: "",
    };
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.onDayChange(e.target.value);
    }

    // handle any changes to the input fields
    handleInputChange = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        // console.log(event.target.value);
        const { name, value } = event.target;
        // Set the state for the appropriate input field
        this.setState({
            [name]: value
        });
    }
    componentDidMount() {
        api.getRoomTypes()
            .then(res => this.setState({ RoomTypes: res, roomtype: res[0].room_type_id }))
            .catch(err => console.log(err));
    }

    // When the form is submitted, prevent the default event and alert the username and password
    handleFormSubmit = event => {
        event.preventDefault();
        // alert(`Arrival Date: ${this.state.arrivaldate}\nDeparture Date: ${this.state.departuredate}\nAdults: ${this.state.adults}\nRoom Type: ${this.state.roomtype}\nNum Rooms: ${this.state.numrooms}\nUsername: ${this.state.firstname}\nPassword: ${this.state.lastname}\nPhone: ${this.state.phone}\nEmail: ${this.state.email}\nAddress: ${this.state.address}\nCity: ${this.state.city}\nState: ${this.state.state}\nZip: ${this.state.zip}\nCredit Card #: ${this.state.creditCard}\nExpiration: ${this.state.expirationDate}`);
        api.createReservation(this.state)
            .then(res => this.setState({ reservationSuccess: true, newReservationId: res.data.reservation_id }))
            .catch(err => console.log(err));
    }

    render() {

        const { from, to } = this.props;

        if (this.state.reservationSuccess) {
            return (
                <Redirect to={{
                    pathname: '/ResConfirmation',
                    state: { newReservationId: this.state.newReservationId }
                }} />
            )
        }

        return (
            <Container>
                <Row>
                    <Col sm={2}>
                        <InfoPart />
                    </Col>
                    <Col sm={10}>
                        <Row>
                            <Col xl={12}>
                                <Header>NEW RESERVATION</Header>
                            </Col>
                        </Row>
                        <div id="res" style={{ paddingBottom: "10px" }}>
                            <Row style={{ marginTop: "5px" }}>
                                <Col xl={1}>
                                    Arrival
                                        </Col>
                                <Col xl={6}>
                                    <div>
                                    <DateRange
                                        value={from, to}
                                        onChange={this.handleChange}
                                    />
                                     

                                    </div>
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
                                    <select name="roomtype" onChange={this.handleInputChange}>
                                        {this.state.RoomTypes.map(type => (
                                            <option key={type.room_type_id} value={type.room_type_id}>{type.type} - {type.rate}</option>
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
                                    <select />
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
                                            Credit Card Number
                                        </Col>
                                        <Col xl={10}>
                                            <CreditCardInput
                                                cardNumberInputProps={{ value: this.state.creditCard, onChange: this.handleCardNumberChange }}
                                                cardExpiryInputProps={{ value: this.state.expirationDate, onChange: this.handleCardExpiryChange }}
                                                cardCVCInputProps={{ value:this.state.cvc, onChange: this.handleCardCVCChange }}
                                                fieldClassName="input"
                                            />
                                            </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>


                        {/* <ButtonSubmit handleSubmit={this.handleFormSubmit} /> */}
                        <button type="submit" className="btn btn-primary" style={{ marginLeft: "480px" }} onClick={this.handleFormSubmit}>Submit</button>
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default ReserveNew;