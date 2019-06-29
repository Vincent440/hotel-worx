import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart"
import Header from "../../components/Header";
import SearchSubmit from "../../components/searchButton"

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
                            <Header>FINANCE</Header>
                            <div id="res">
                                <tr>
                                    <td><p>Room Number</p></td>
                                    <td><input
                                        id="smallWindow"
                                        onChange={this.handleChange}
                                        options={selectedOption}
                                        name="roomNumber"
                                        placeholder="Room Number"
                                        value={this.state.roomNumber}
                                        onChange={this.handleInputChange}
                                    /></td>
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
                                    <td><p>Stay Over</p></td>
                                    <input type="checkbox" id="myCheck" onmouseover="myFunction()" onclick="alert('click event occured')" />

                                    <td><p>Due Out</p></td>
                                    <input type="checkbox" id="myCheck" onmouseover="myFunction()" onclick="alert('click event occured')" />

                                    <td><p>Checked Out</p></td>
                                    <input type="checkbox" id="myCheck" onmouseover="myFunction()" onclick="alert('click event occured')" />
                                    <td>
                                        <SearchSubmit />
                                    </td>
                                </tr>
                            </div>
                        </form>
                        <div id="guestinfo">
                            <table id="result">
                                <thead>
                                    <tr>
                                        <th className="th" id="room number">Room Number</th>
                                        <th className="th" >Name</th>
                                        <th className="th" id="arrival date">Arrival Date</th>
                                        <th className="th" id="departure date">Departure Date</th>
                                        <th className="th" id="balance">Balance</th>
                                        <th className="th" id="status">Status</th>

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

export default Billing;
