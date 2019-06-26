import React, { Component } from 'react';
import api from '../utils/api';

class ReservationTest extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    };

    state = {
        ReservationInfo: {},
        RoomInfo: []
    };

    componentDidMount() {
        api.getReservation(2)
            .then(res => this.setState({ ReservationInfo: res.resCust.result[0], RoomInfo: res.resRooms.result }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="text-white">
                <h3 className="p-2">Reservation Test Page</h3>
                <p className="text-white">Reservation and Customer Info</p>
                <ul>
                    <li>Reservation ID: {this.state.ReservationInfo.reservation_id}</li>
                    <li>Reservation Made by User ID: {this.state.ReservationInfo.user_id}</li>
                    <li>Reservation Created On: {this.state.ReservationInfo.created_at}</li>
                    <li>Customer ID: {this.state.ReservationInfo.customer_id}</li>
                    <li>Customer First Name: {this.state.ReservationInfo.first_name}</li>
                    <li>Customer Last Name: {this.state.ReservationInfo.last_name}</li>
                    <li>Customer Address: {this.state.ReservationInfo.address}</li>
                    <li>Customer City: {this.state.ReservationInfo.city}</li>
                    <li>Customer State: {this.state.ReservationInfo.state}</li>
                    <li>Customer Zip: {this.state.ReservationInfo.zip}</li>
                    <li>Customer Email: {this.state.ReservationInfo.email}</li>
                    <li>Customer Phone: {this.state.ReservationInfo.phone}</li>
                </ul>
                {this.state.RoomInfo.map((room, i) => (
                    <div key={room.res_room_id}>
                        <p className="text-white">Room: {i+1}</p>
                        <ul>
                            <li>ResRoom ID: {room.res_room_id}</li>
                            <li>Adults: {room.adults}</li>
                            <li>Check in Date: {room.check_in_date}</li>
                            <li>Check out Date: {room.check_out_date}</li>
                            <li>Rate: {room.rate}</li>
                            <li>Room Number: {room.room_num}</li>
                            <li>Room Type: {room.type}</li>
                        </ul>
                    </div>
                ))}
            </div>
        );
    }
}

export default ReservationTest;