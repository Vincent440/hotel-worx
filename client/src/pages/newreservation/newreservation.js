import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import Select from 'react-select';
import api from '../../utils/api';
import Header from "../../components/Header";
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

            <Row id="dashboardTable">
                <InfoPart />
                <Col sm={10}>
                    <form>
                        <Header> NEW RESERVATION</Header>

                        <div id="res">
                            <table>
                                <tr>
                                    <td><p>Arrival Date</p></td>
                                    <td><input
                                        type="date"
                                        name="departuredate"
                                        value={this.state.arrivaldate}
                                        onChange={this.handleInputChange}
                                    /></td>

                                    <td><p>Nights</p></td>
                                    <td><input
                                        id="smallWindow"
                                        type="number"
                                        placeholder="Number of Nights"
                                        name="nights"
                                        value={this.state.nights}
                                        onChange={this.handleInputChange}
                                    /></td>
                                    <td><p>No of Rooms</p></td>
                                    <td><input
                                        id="smallWindow"
                                        type="number"
                                        placeholder="Number of Rooms"
                                        name="roomsnumber"
                                        value={this.state.roomsnumber}
                                        onChange={this.handleInputChange}
                                    /></td>
                                    <td><p>Rate</p></td>
                                    <td><input
                                        id="smallWindow"
                                        type="tel"
                                        placeholder="Rate"
                                        name="roomrate"
                                        value={this.state.roomrate}
                                        onChange={this.handleInputChange}
                                    /></td>
                                </tr>
                                <tr>
                                    <td><p>Departure Date</p></td>
                                    <td><input
                                        type="date"
                                        name="departuredate"
                                        value={this.state.departuredate}
                                        onChange={this.handleInputChange}
                                    /></td>

                                    <td ><p>Adults</p></td>
                                    <td><input
                                        id="smallWindow"
                                        type="number"
                                        name="adultnumber"
                                        placeholder="Adults"
                                        value={this.state.adultnumber}
                                        onChange={this.handleInputChange}
                                    /></td>
                                    <td ><p>Room Type: </p></td>
                                    <td >
                                        <select>
                                            {this.state.RoomTypes.map(type => (
                                                <option key="type.room_type_id">{type.type}</option>
                                            ))}
                                        </select>

                                    </td>
                                    <td ><p>Room Number</p></td>
                                    <td><Select
                                        
                                    /></td>
                                </tr>
                            </table>
                        </div>
                        <div id="guestinfo">
                            <table>
                                <tr>
                                    <td><p>First Name</p></td>
                                    <td><input
                                        type="text"
                                        placeholder="First Name"
                                        name="firstname"
                                        value={this.state.firstname}
                                        onChange={this.handleInputChange}
                                    /></td>
                                    <td><p>Last Name</p></td>
                                    <td><input
                                        type="text"
                                        placeholder="Last Name"
                                        name="lastname"
                                        value={this.state.lastname}
                                        onChange={this.handleInputChange}
                                    /></td>
                                </tr>
                                <tr>
                                    <td><p>Phone Number</p></td>
                                    <td><input
                                        type="tel"
                                        placeholder="Phone Number"
                                        name="phone"
                                        value={this.state.phone}
                                        onChange={this.handleInputChange}
                                    /></td>
                                    <td><p>Email Address</p></td>
                                    <td><input
                                        type="email"
                                        placeholder="Email Address"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                    /></td>
                                </tr>
                                <tr>
                                    <td><p>Adress</p></td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Adress"
                                            name="address"
                                            value={this.state.address}
                                            onChange={this.handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="City"
                                            name="city"
                                            value={this.state.city}
                                            onChange={this.handleInputChange}
                                        /></td>
                                    <td>
                                        <td>
                                            <input
                                                type="text"
                                                placeholder="State"
                                                name="state"
                                                value={this.state.state}
                                                onChange={this.handleInputChange}
                                            /></td>
                                        <input
                                            type="text"
                                            placeholder="ZipCode"
                                            name="zip"
                                            value={this.state.zip}
                                            onChange={this.handleInputChange}
                                        /></td>

                                </tr>
                                <tr>
                                    <td><p>Credit Card Number</p></td>
                                    <td>
                                        <input
                                            type="tel"
                                            placeholder="CC Number"
                                            name="creditCard"
                                            value={this.state.creditCard}
                                            onChange={this.handleInputChange}
                                        />
                                    </td>
                                    <td><p>Expiration Date</p></td>

                                    <td>
                                        <input
                                            type="tel"
                                            placeholder="expiration date"
                                            name="expirationDate"
                                            value={this.state.expirationDate}
                                            onChange={this.handleInputChange}
                                        /></td>

                                </tr>
                            </table>
                        </div>
                        {/* <ButtonSubmit handleSubmit={this.handleFormSubmit} /> */}
                        <button type="submit" class="btn btn-primary" style={{marginLeft:"480px"}} onClick={this.handleFormSubmit}>Submit</button>
                    </form>

                </Col>
            </Row>
        )
    }
}

export default ReserveNew;
