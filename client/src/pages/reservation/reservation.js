import React, { Component } from "react";
import api from '../../utils/api';
import { Row, Col } from 'react-grid-system';
import "./style1.css";
import logo from './solidcolor.png';
import MyComponent from "../../components/calendar"
import Select from 'react-select';

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
        ReservationInfo: {},
        RoomInfo: []
    };

    componentDidMount() {
        api.getReservation(1)
            .then(res => this.setState({ ReservationInfo: res.resCust.result[0], RoomInfo: res.resRooms.result }))
            .catch(err => console.log(err))
    }

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
                                <h2>New Reservation</h2>
                            </div>
                            <div id="res">
                                {this.state.RoomInfo.map((room, i) => (
                                    <div key={room.res_room_id}>
                                        <table>
                                            <tr>
                                                <th><p>Confirmation Number: {this.state.ReservationInfo.reservation_id}</p></th>
                                            </tr>
                                            <tr>
                                                <th></th>
                                            </tr>
                                            <tr>
                                                <td><p>Arrival Date: {room.check_in_date}</p></td>
                                                <td><p>Name: {this.state.ReservationInfo.first_name} </p></td>
                                            </tr><tr>
                                                <td><p>Departure Date: {room.check_out_date}</p></td>
                                                <td><p>Last Name: {this.state.ReservationInfo.last_name}</p></td>
                                            </tr>
                                            <tr>
                                                <td><p>Nights: {this.state.nights}</p></td>
                                                <td><p>Phone Number: {this.state.ReservationInfo.phone}</p></td>
                                            </tr>
                                            <tr>
                                                <td><p>No of Rooms: {this.state.roomsnumber}</p></td>
                                                <td><p>Email Address: {this.state.ReservationInfo.email}</p></td>

                                            </tr>
                                            <tr>
                                                <td><p>Adults: {room.adults} </p></td>
                                                <td><p>Adress: {this.state.ReservationInfo.address}{this.state.ReservationInfo.city}{this.state.ReservationInfo.state} {this.state.ReservationInfo.zip}</p></td>

                                            </tr>
                                            <tr>
                                                <td><p>Room Type: {room.type} </p></td>
                                                <td><p>Credit Card Number: {this.state.ccnumber}</p></td>

                                            </tr>
                                            <tr>
                                                <td><p>Room Number: {room.room_num}</p></td>
                                                <td><p>Expiration Date: {this.state.expdate}</p></td>
                                            </tr>
                                            <tr>
                                                <td><p>Daily Room Rate: {room.rate}</p></td>
                                            </tr>
                                            <tr>
                                                <td><p></p></td>
                                            </tr>
                                            <tr>
                                                <td><p>Created date: {this.state.ReservationInfo.created_at}</p></td>
                                                <td><p>Created by: {this.state.ReservationInfo.user_id}</p></td>


                                            </tr>
                                        </table>
                                    </div>
                                ))}
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

export default Reservation;
