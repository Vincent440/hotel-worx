import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style5.css";
import logo from './solidcolor.png';
import MyComponent from "../../components/calendar"
import Select from 'react-select';

class DetailedAvailability extends Component {
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
                                <h2>Detailed Availability</h2>
                            </div>
                            <div id="res">
                                <tr>

                                    <td><p>Start Date</p></td>
                                    <td><input
                                        type="date"
                                        name="arrivaldate"
                                        value={this.state.arrivaldate}
                                        onChange={this.handleInputChange}
                                    /></td>

                                    <td><p style={{ marginLeft: "80px", }}>Availability  </p></td>
                                    <input type="checkbox" id="myCheck" onmouseover="myFunction()" onclick="alert('click event occured')" />

                                    <td><p style={{ marginLeft: "80px", }}>Occupancy</p></td>
                                    <input type="checkbox" id="myCheck" onmouseover="myFunction()" onclick="alert('click event occured')" />


                                    <td>
                                        <button id="searchButton" onClick={this.handleFormSubmit} style={{ marginLeft: "200px", marginBottom: "5px", }}>Search</button>
                                    </td>
                                </tr>
                            </div>
                        </form>
                        <div id="guestinfo">
                            <table id="result">
                                <thead>
                                    <tr>
                                        <th className="th" id="date" colspan="2">Date</th>
                                        <th className="th" id="total" > Total</th>
                                        <th className="th" id="twoQueens">Two Queens</th>
                                        <th className="th" id="king">King</th>
                                        <th className="th" id="suite">Suite</th>
                                    </tr>
                                    <tr>
                                        <td className="tableTD" > Monday</td>
                                        <td className="tableTD" > 6/25/2019</td>
                                        <td className="tableTD" > 10</td>
                                        <td className="tableTD" > 4</td>
                                        <td className="tableTD" > 4</td>
                                        <td className="tableTD" > 2</td>
                                    </tr>
                                    <tr>
                                        <td className="tableTD" > Monday</td>
                                        <td className="tableTD" > 6/25/2019</td>
                                        <td className="tableTD" > 10</td>
                                        <td className="tableTD" > 4</td>
                                        <td className="tableTD" > 4</td>
                                        <td className="tableTD" > 2</td>
                                    </tr>
                                    <tr>
                                        <td className="tableTD" > Monday</td>
                                        <td className="tableTD" > 6/25/2019</td>
                                        <td className="tableTD" > 10</td>
                                        <td className="tableTD" > 4</td>
                                        <td className="tableTD" > 4</td>
                                        <td className="tableTD" > 2</td>
                                    </tr>
                                    <tr>
                                        <td className="tableTD" > Monday</td>
                                        <td className="tableTD" > 6/25/2019</td>
                                        <td className="tableTD" > 10</td>
                                        <td className="tableTD" > 4</td>
                                        <td className="tableTD" > 4</td>
                                        <td className="tableTD" > 2</td>
                                    </tr>
                                    <tr>
                                        <td className="tableTD" > Monday</td>
                                        <td className="tableTD" > 6/25/2019</td>
                                        <td className="tableTD" > 10</td>
                                        <td className="tableTD" > 4</td>
                                        <td className="tableTD" > 4</td>
                                        <td className="tableTD" > 2</td>
                                    </tr>
                                    <tr>
                                        <td className="tableTD" > Monday</td>
                                        <td className="tableTD" > 6/25/2019</td>
                                        <td className="tableTD" > 10</td>
                                        <td className="tableTD" > 4</td>
                                        <td className="tableTD" > 4</td>
                                        <td className="tableTD" > 2</td>
                                    </tr>
                                    <tr>
                                        <td className="tableTD" > Monday</td>
                                        <td className="tableTD" > 6/25/2019</td>
                                        <td className="tableTD" > 10</td>
                                        <td className="tableTD" > 4</td>
                                        <td className="tableTD" > 4</td>
                                        <td className="tableTD" > 2</td>
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

export default DetailedAvailability;
