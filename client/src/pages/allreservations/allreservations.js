import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header";
import SearchSubmit from "../../components/searchButton";
import DateRange from "../../components/dateRange/dateRange";

class UpdateReservation extends Component {
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
                <InfoPart />

                <Col sm={10}>
                    <form>
                        <Header>ALL RESERVATIONS</Header>

                        <div id="res">
                            <table>
                                <tr>
                                    <th>Date</th>
                                    <td colspan="2">
                                        <DateRange
                                        />
                                    </td>
                                    <th>Confirmation Number</th>
                                    <td><input
                                        type="tel"
                                        placeholder="Confirmation Number"
                                        name="confirmation"
                                        value={this.state.confirmation}
                                        onChange={this.handleInputChange}
                                    /></td>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <td><input
                                        type="text"
                                        placeholder="Name"
                                        name="guestname"
                                        value={this.state.guestname}
                                        onChange={this.handleInputChange}
                                    /></td>
                                    <td></td>
                                    <th>Last Name</th>
                                    <td><input
                                        type="text"
                                        placeholder="Last Name"
                                        name="guestlastname"
                                        value={this.state.lastname}
                                        onChange={this.handleInputChange}
                                    /></td>
                                </tr>

                            </table>

                        </div>
                        <div>
                            <SearchSubmit />

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

export default UpdateReservation;
