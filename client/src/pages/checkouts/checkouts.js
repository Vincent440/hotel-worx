import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart"


class Reservation extends Component {
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
               <InfoPart user={this.props.user} logout={this.props.logout} />
                <Col sm={10}>
                    <row>
                        <form>
                            <h2>Reservation</h2>
                            <div id="res">
                                <table>
                                    <tr>
                                        <th><p>Confirmation Number: {this.state.confirmation}</p></th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <td><p>Arrival Date: {this.state.arrivaldate}</p></td>
                                        <td><p>Name:{this.state.guestname} </p></td>
                                    </tr><tr>
                                        <td><p>Departure Date: {this.state.departuredate}</p></td>
                                        <td><p>Last Name:{this.state.lastname}</p></td>
                                    </tr>
                                    <tr>
                                        <td><p>Nights: {this.state.nights}</p></td>
                                        <td><p>Phone Number:{this.state.guestphone}</p></td>
                                    </tr>
                                    <tr>
                                        <td><p>No of Rooms: {this.state.roomsnumber}</p></td>
                                        <td><p>Phone Number:{this.state.guestphone}</p></td>
                                    </tr>
                                    <tr>
                                        <td><p>Adults:{this.state.adultnumber} </p></td>
                                        <td><p>Email Address:{this.state.emailaddress}</p></td>
                                    </tr>
                                    <tr>
                                        <td><p>Room Type:{this.state.roomType} </p></td>
                                        <td><p>Adress: {this.state.street}{this.state.state}{this.state.city}{this.state.zip}</p></td>
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
                            <button type="button" className="btn btn-primary">Save</button>
                            <button type="button" className="btn btn-primary">Print</button>
                            <button type="button" className="btn btn-primary">Email</button>
                            <button type="button" className="btn btn-primary">Close</button>

                            </div>
                        </form>
                    </row>
                </Col >
            </Row >
        )
    }
}

export default Reservation;
