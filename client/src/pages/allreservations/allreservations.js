import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import logo from './solidcolor.png';
import MyComponent from "../../components/calendar"
import Select from 'react-select';

class FormUpdate extends Component {
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

        const { options } = [
            { value: "Two Queens", label: "Two Queens" },
            { value: "King", label: "King" },
            { value: "Suite", label: "Suite" },

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
                            <h2>All Reservations</h2>
                        </div>
                        <div id="res">
                            <tr>
                                <td><p>Arrival Date</p></td>
                                <td><input
                                    type="date"
                                    name="arrivaldate"
                                    value={this.state.arrivaldate}
                                    onChange={this.handleInputChange}
                                /></td>
                                <td><p>Departure Date</p></td>
                                <td><input
                                    type="date"
                                    name="departuredate"
                                    value={this.state.departuredate}
                                    onChange={this.handleInputChange}
                                /></td>
                            </tr>
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
                                <td><p>Confirmation Number</p></td>
                                <td><input
                                    type="tel"
                                    placeholder="Confirmation Number"
                                    name="confirmation"
                                    value={this.state.confirmation}
                                    onChange={this.handleInputChange}
                                /></td>
                                <td>
                                    <button onClick={this.handleFormSubmit}>Submit</button>
                                </td>
                            </tr>


                        </div>

                        <div id="guestinfo">
                            <table id="result">
                                <thead>
                                    <tr>
                                        <th className="th" id="last name">Last Name</th>
                                        <th className="th" id="first name">First Name</th>
                                        <th className="th" id="arrival date">Arrival Date</th>
                                        <th className="th" id="departure date">Departure Date</th>
                                        <th className="th" id="room type">Room Type</th>
                                        <th className="th" id="room type">Status</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <!-- Results from DB here --> */}
                                </tbody>
                            </table>



                        </div>

                    </form>


                </Col>
            </Row >
        )
    }
}

export default FormUpdate;
