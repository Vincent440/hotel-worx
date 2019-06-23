import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import logo from './solidcolor.png';
import MyComponent from "../../components/calendar"
import Select from 'react-select';

class ReserveUpdate extends Component {
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
    };

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

        const { roomType } = [
            { value: "Two Queens", label: "Two Queens" },
            { value: "King", label: "King" },
            { value: "Suite", label: "Suite" },

        ];


        const { roomNumber } = [
            { value: "101", label: "101" },
            { value: "102", label: "102" },
            { value: "103", label: "103" },
            { value: "104", label: "104" },
            { value: "105", label: "105" },
            { value: "106", label: "106" },
            { value: "107", label: "107" },
            { value: "108", label: "108" },
            { value: "109", label: "109" },
            { value: "110", label: "110" },
        ];
        const { selectedOption } = this.state;


        return (

            <Row id="dashboardTable">
                <Col sm={2} id="infoPart">
                    <img src={logo} className="App-logo" id="logo" alt="logo" />
                    <h5>User Name</h5><br></br>
                    <MyComponent></MyComponent><br></br>
                    <h5>Weather</h5><br></br>
                    <i className="fa fa-gear" style={{ fontSize: '28px' }} />
                </Col>
                <Col sm={10}>
                    <form>
                        <div id="header">
                            <button id="exit" onClick={this.handleFormSubmit}>x</button>
                            <h2>Update Reservation</h2>
                        </div>
                        <div id="res">
                            <tr>
                                <td><p>Confirmation Number:{this.state.confirmation}</p></td>
                            </tr>
                            <tr>
                                <td><p>Arrival Date</p></td>
                                <td><input
                                    type="date"
                                    name="arrivaldate"
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
                                <td ><p>Room Type</p></td>
                                <td ><Select
                                    id="smallWindow"
                                    value={roomType}
                                    onChange={this.handleChange}
                                    options={selectedOption}
                                    name="roomtype"
                                    placeholder="Room Type"
                                    value={this.state.roomType}
                                    onChange={this.handleInputChange}
                                /></td>
                                <td ><p>Room Number</p></td>
                                <td><Select
                                    id="smallWindow"
                                    value={roomNumber}
                                    onChange={this.handleChange}
                                    options={selectedOption}
                                    name="roomnumber"
                                    placeholder="Room Number"
                                    value={this.state.roomNumber}
                                    onChange={this.handleInputChange}
                                /></td>
                            </tr>
                        </div>
                        <div id="guestinfo">
                            <tr>
                                <td><p>Name</p></td>
                                <td><input
                                    type="text"
                                    placeholder="Name"
                                    name="guestname"
                                    value={this.state.guestname}
                                    onChange={this.handleInputChange}
                                /></td>
                                <td><p>Last Name</p></td>
                                <td><input
                                    type="text"
                                    placeholder="Last Name"
                                    name="guestlastname"
                                    value={this.state.lastname}
                                    onChange={this.handleInputChange}
                                /></td>
                            </tr>
                            <tr>
                                <td><p>Phone Number</p></td>
                                <td><input
                                    type="tel"
                                    placeholder="Phone Number"
                                    name="guestphone"
                                    value={this.state.guestphone}
                                    onChange={this.handleInputChange}
                                /></td>
                                <td><p>Email Address</p></td>
                                <td><input
                                    type="email"
                                    placeholder="Email Address"
                                    name="guestaddress"
                                    value={this.state.guestaddress}
                                    onChange={this.handleInputChange}
                                /></td>
                            </tr>
                            <tr>
                                <td><p>Adress</p></td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Street"
                                        name="street"
                                        value={this.state.street}
                                        onChange={this.handleInputChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="State"
                                        name="state"
                                        value={this.state.state}
                                        onChange={this.handleInputChange}
                                    /></td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="City"
                                        name="city"
                                        value={this.state.city}
                                        onChange={this.handleInputChange}
                                    /></td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="ZipCode"
                                        name="zipcode"
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
                                        name="ccnumber"
                                        value={this.state.ccnumber}
                                        onChange={this.handleInputChange}
                                    />
                                </td>
                                <td><p>Expiration Date</p></td>

                                <td>
                                    <input
                                        type="tel"
                                        placeholder="Expiration date"
                                        name="edate"
                                        value={this.state.edate}
                                        onChange={this.handleInputChange}
                                    /></td>

                            </tr>
                        </div>
                        <button onClick={this.handleFormSubmit}>Save</button>

                    </form>


                </Col>
            </Row>
        )
    }
}

export default ReserveUpdate;
