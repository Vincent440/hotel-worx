import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style5.css";
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header"

class Housekeeping extends Component {
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
               <InfoPart />
                <Col sm={10}>
                    <row>
                        <form>
                           <Header>HOUSEKEEPING</Header>
                            <div id="res">
                                <tr>
                                    <td>
                                        <tr>
                                            <p> Room Status: </p>
                                            <td><p>Clean</p></td>
                                            <input type="checkbox" id="myCheck" onmouseover="myFunction()" onclick="alert('click event occured')" />

                                            <td><p>Dirty</p></td>
                                            <input type="checkbox" id="myCheck" onmouseover="myFunction()" onclick="alert('click event occured')" />

                                            <td><p>Out of Order</p></td>
                                            <input type="checkbox" id="myCheck" onmouseover="myFunction()" onclick="alert('click event occured')" />

                                        </tr>
                                        <tr>
                                            <p> Front Office Status: </p>
                                            <td><p>Vacant</p></td>
                                            <input type="checkbox" id="myCheck" onmouseover="myFunction()" onclick="alert('click event occured')" />

                                            <td><p>Occupied</p></td>
                                            <input type="checkbox" id="myCheck" onmouseover="myFunction()" onclick="alert('click event occured')" />
                                        </tr>
                                        <tr>
                                            <p> Reservation Status: </p>
                                            <td><p>Arrival</p></td>
                                            <input type="checkbox" id="myCheck" onmouseover="myFunction()" onclick="alert('click event occured')" />

                                            <td><p>Arrived</p></td>
                                            <input type="checkbox" id="myCheck" onmouseover="myFunction()" onclick="alert('click event occured')" />

                                            <td><p>Stay Over</p></td>
                                            <input type="checkbox" id="myCheck" onmouseover="myFunction()" onclick="alert('click event occured')" />

                                            <td><p>Due Out</p></td>
                                            <input type="checkbox" id="myCheck" onmouseover="myFunction()" onclick="alert('click event occured')" />

                                            <td><p>Departed</p></td>
                                            <input type="checkbox" id="myCheck" onmouseover="myFunction()" onclick="alert('click event occured')" />

                                            <td><p>Not Reserved</p></td>
                                            <input type="checkbox" id="myCheck" onmouseover="myFunction()" onclick="alert('click event occured')" />

                                        </tr>
                                    </td>
                                    <td>
                                        <tr>
                                            <td>
                                                <button onClick={this.handleFormSubmit} style={{ marginLeft: "150px", marginBottom:"10px",}}>Select All</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <button onClick={this.handleFormSubmit} style={{ marginLeft: "150px", marginBottom:"25px",}}>Clear All</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <button id="searchButton" onClick={this.handleFormSubmit} style={{ marginLeft: "150px",marginBottom:"5px", }}>Search</button>
                                            </td>
                                        </tr>
                                    </td>
                                </tr>
                            </div>
                        </form>
                        <div id="guestinfo">
                            <table id="result">
                                <thead>
                                    <tr>
                                        <th className="th" id="room number">Room</th>
                                        <th className="th" id="room type" > Room Type</th>
                                        <th className="th" id="roomStatus">Room Status</th>
                                        <th className="th" id="foStatus">Front Office Status</th>
                                        <th className="th" id="status">Reservation Status</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <!-- Results from DB here --> */}
                                </tbody>
                            </table>

                        </div>
                    </row>
                </Col >
            </Row >
        )
    }
}

export default Housekeeping;
