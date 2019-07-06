import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style3.css";
import api from '../../utils/api';
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header"


class Payment extends Component {
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


        return (

            <Row id="dashboardTable1">
                <InfoPart />
                <Col sm={10}>
                    <row>
                        <form>
                            {this.state.RoomInfo.map((room, i) => (
                                <div>
                                    <Header>BILLING - Room: {room.room_num}</Header>

                                    <div id="resInvoice">
                                        <table border="1">
                                            <tr>
                                                <td>Balance: {this.state.balance}</td>
                                                <td>Arrival Date: {room.check_in_date}</td>
                                                <td>Daily Room Rate:{this.state.roomRate}</td>
                                            </tr>
                                            <tr>
                                                <td>Status:</td>
                                                <td>Departure Date: {room.check_out_date}</td>
                                                <td>Room Type: {room.type}</td>
                                            </tr>

                                        </table>
                                        <div>
                                            <thead>
                                                <tr>
                                                    <th className="tableInfo">{this.state.ReservationInfo.last_name}, {this.state.ReservationInfo.first_name}</th>
                                                    <th className="tableInfo">CC: <input type="checkbox" id="myCheck" onmouseover="myFunction()" onclick="alert('click event occured')" />
                                                        {this.state.ccnumber}</th>
                                                    <th className="tableInfo">Cash:   <input type="checkbox" id="myCheck" onmouseover="myFunction()" onclick="alert('click event occured')" />
                                                    </th>
                                                </tr>
                                            </thead>
                                        </div>
                                        <table id="result">
                                            <thead>
                                                <tr>
                                                    <th className="th" id="date">Date</th>
                                                    <th className="th" id="description">Description</th>
                                                    <th className="th" id="amount">Amount</th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>


                                    <div id="buttonDiv">
                                        <button type="button" class="btn btn-primary" style={{marginLeft:"350px", marginTop:"10px"}}>Post</button>
                                        <button type="button" class="btn btn-danger" style={{marginTop:"10px"}}>Payment</button>
                                        <button type="button" class="btn btn-danger" style={{marginTop:"10px"}}>Check Out</button>
                                        <button type="button" class="btn btn-primary" style={{marginTop:"10px", marginLeft:"5px"}}>Close</button>

                                    </div>
                                </div>

                            ))}

                        </form>
                    </row>
                </Col >
            </Row >
        )
    }
}

export default Payment;
