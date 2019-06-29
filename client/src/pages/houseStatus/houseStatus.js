import React, { Component } from "react";
import api from '../../utils/api';
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header"
import SearchSubmit from "../../components/searchButton";


class HouseStatus extends Component {
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
                <InfoPart />
                <Col sm={10}>
                    <row>
                        <Header>HOUSE STATUS</Header>
                        <form>
                            <div id="resHouse">
                                {this.state.RoomInfo.map((room, i) => (
                                    <div key={room.res_room_id}>
                                        <table>
                                            <tr>
                                                <th><p>Room Summary</p></th>
                                                <th><p>Activity</p></th>
                                                <th><p>Housekeeping Room Status</p></th>
                                            </tr>

                                            <td>
                                                <tr>
                                                    <td><p> Total Rooms to Sell: {}</p></td>
                                                </tr>

                                                <tr>
                                                    <td><p>Min. Available Tonight:{}</p></td>
                                                </tr>
                                                <tr>
                                                    <td><p>Max. Occupied Tonight{} </p></td>
                                                </tr>
                                            </td>
                                            <td>

                                                <tr>
                                                    <td><p>Stayovers: {}</p></td>
                                                </tr>
                                                <tr>
                                                    <td><p>Departures Expected: {}</p></td>
                                                </tr>
                                                <tr>
                                                    <td><p>Departures Actual: {}</p></td>
                                                </tr>
                                                <tr>
                                                    <td><p>Arrivals Expected: {}</p></td>
                                                </tr>
                                                <tr>
                                                    <td><p>Arrivals Actual: {}</p></td>
                                                </tr>
                                            </td>
                                            <td>
                                                <tr>
                                                    <tr>
                                                        <td></td>
                                                        <td><p>Vacant</p></td>
                                                        <td><p>Occupied</p></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Clean</td>
                                                        <td id="vacantClean" style={{ border: "1px solid black", width: "40px;" }}>{}</td>
                                                        <td id="occupiedClean" style={{ border: "1px solid black", width: "30px;" }}>{}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Dirty</td>
                                                        <td id="vacantDirty" style={{ border: "1px solid black", width: "40px;" }}>{}</td>
                                                        <td id="occupiedDirty" style={{ border: "1px solid black", width: "30px;" }}>{}</td>
                                                    </tr>
                                                </tr>
                                            </td>

                                            <tr style={{ marginTop: "20px;", }} >
                                                <td style={{ textAlign: "right", marginLeft: "20px;", }}><p>Date</p></td>
                                                <td><input
                                                    id="smallWindow"
                                                    type="date"
                                                    name="arrivaldate"
                                                    value={this.state.arrivaldate}
                                                    onChange={this.handleInputChange}
                                                /></td>
                                            </tr>

                                        </table>
                                    </div>
                                ))}
                            </div>
                            <div id="buttonDiv">
                                <button type="button" class="btn btn-primary" style={{marginLeft:"450px"}}>Search</button>

                                <button type="button" class="btn btn-primary" style={{marginLeft:"20px"}}>Close</button>

                            </div>
                        </form>
                    </row>
                </Col >
            </Row >
        )
    }
}

export default HouseStatus;
