import React, { Component } from "react";
import api from '../../utils/api';
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header";
import Particles from "react-particles-js";

const particleOpt = { particles: { number: { value: 120, density: { enable: true, value_area: 1000 } } } };
class Reservation extends Component {
    state = {
        ReservationInfo: {},
        RoomInfo: [],
        reservation_id: ""
    };

    componentDidMount() {
        let reservation_id = "";
        if (localStorage && localStorage.getItem('reservation_id')) {
            reservation_id = JSON.parse(localStorage.getItem('reservation_id'));
        }
        this.setState({ reservation_id: reservation_id }, () => {
            api.getReservation(this.state.reservation_id)
            .then(res => this.setState({ ReservationInfo: res.resCust[0], RoomInfo: res.resRooms }))
            .catch(err => console.log(err))
        });
    }

    render() {

        return (
            <Particles params={particleOpt} id="particul" />

            <Row id="dashboardTable1">
                <InfoPart user={this.props.user} logout={this.props.logout} />
                <Col sm={10}>
                    <row>
                        <div id="header">
                            <Header>RESERVATION CONFIRMATION</Header>
                        </div>
                        <div id="res">
                            <table>
                                <tr>
                                    <th>Reservation ID</th>
                                    <th>Created On</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>CC Last 4</th>
                                    <th>User ID</th>
                                </tr>
                                <tr>
                                    <td>{this.state.ReservationInfo.reservation_id}</td>
                                    <td>{this.state.ReservationInfo.created_at}</td>
                                    <td>{this.state.ReservationInfo.last_name}, {this.state.ReservationInfo.first_name}</td>
                                    <td>{this.state.ReservationInfo.email}</td>
                                    <td>{this.state.ReservationInfo.phone}</td>
                                    <td>{this.state.ReservationInfo.ccLastFour}</td>
                                    <td>{this.state.ReservationInfo.user_id}</td>
                                </tr>
                            </table>

                            <table>
                                <tr>
                                    <th>Confirmation Number</th>
                                    <th>Arrival Date</th>
                                    <th>Departure Date</th>
                                    <th>Room Type</th>
                                    <th>Room Rate</th>
                                    <th>Adults</th>
                                    <th>Comments</th>
                                </tr>
                                {this.state.RoomInfo.map(room => (
                                    <tr key={room.res_room_id}>
                                        <td>{room.confirmation_code}</td>
                                        <td>{room.check_in_date}</td>
                                        <td>{room.check_out_date}</td>
                                        <td>{room.type}</td>
                                        <td>{room.rate}</td>
                                        <td>{room.adults}</td>
                                        <td>{room.comments}</td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </row>
                </Col >
            </Row >
        )
    }
}

export default Reservation;