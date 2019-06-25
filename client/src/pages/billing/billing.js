import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style2.css";
import logo from './solidcolor.png';
import MyComponent from "../../components/calendar"
import Select from 'react-select';

class Billing extends Component {
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

            <Row id="dashboardTable1">
                <Col sm={2} id="infoPart">
                    <img src={logo} className="App-logo" id="logo" alt="logo" />
                    <h5>User Name</h5><br></br>
                    <MyComponent></MyComponent><br></br>
                    <h5>Weather</h5><br></br>
                    <i className="fa fa-gear" style={{ fontSize: '28px' }} />
                </Col>
                <Col sm={10}>
                    <row>
                        <form>
                            <div id="header">
                                <button id="exit" onClick={this.handleFormSubmit}>x</button>
                                <h2>Invoice</h2>
                            </div>
                            <div id="res">
                                <table>
                                    <tr>
                                        <th><p>Confirmation Number: {this.state.confirmation}</p></th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <td><p>Name:{this.state.guestname} </p></td>
                                    </tr>
                                    <tr>
                                        <td><p>Last Name:{this.state.lastname}</p></td>
                                    </tr>
                                    <tr>
                                        <td><p>Room Number:{this.state.roomNumber}</p></td>
                                        <td><p>Credit Card Number:{this.state.ccnumber}</p></td>
                                    </tr>
                                    <tr>
                                        <td><p>Daily Room Rate:{this.state.roomRate}</p></td>
                                        <td><p>Expiration Date:{this.state.expdate}</p></td>
                                    </tr>
                                    <tr>
                                        <td><p></p></td>
                                    </tr>
                                    <tr>
                                        <td><p>Created date:{this.state.createDate}</p></td>
                                        <td><p>Created by:{this.state.username}</p></td>


                                    </tr>
                                </table>
                            </div>
                            <div id="buttonDiv">
                                <button id="revNew1" onClick={this.handleFormSubmit}>Save</button>
                                <button id="revNew" onClick={this.handleFormSubmit}>Print</button>
                                <button id="revNew" onClick={this.handleFormSubmit}>Email</button>
                                <button id="revNew" onClick={this.handleFormSubmit}>Close</button>

                            </div>
                        </form>
                    </row>
                </Col >
            </Row >
        )
    }
}

export default Billing;
