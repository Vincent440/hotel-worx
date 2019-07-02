import React, { Component } from 'react';
import api from '../utils/api';

class ReservationTest extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    };

    state = {
        ReservationInfo: {},
        RoomInfo: [],
        RoomTypes: []
    };

    componentDidMount() {
        api.getReservation(2)
            .then(res => this.setState({ ReservationInfo: res.resCust.result[0], RoomInfo: res.result }))
            .catch(err => console.log(err));
        api.getRoomTypes()
            .then(res => this.setState({ RoomTypes: res }))
            .catch(err => console.log(err));
    }

    testNewReservation = () => {
        const dataObj = {
            "cust": ["Peter", "Pan2", "1111 FairyTale Lane", "Fantasyland", "Vermont", "23456", "p.pan@yahoo.net", "555-1212", "n/a", 1],
            "reserve": [1],
            "rooms": [[2, "2019-08-12", "2019-08-15", 2], [2, "2019-08-12", "2019-08-19", 2], [2, "2019-08-12", "2019-08-17", 1]]
        }
        api.createReservation(dataObj)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    formatCC() {
        return this.state.ReservationInfo.credit_card_num ? this.state.ReservationInfo.credit_card_num.slice(-4) : null;
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
                    <li>Customer Credit Card Last 4: {this.formatCC()}</li>
                    <li>Customer Credit Card Exp Date: {this.state.ReservationInfo.cc_expiration}</li>
                    {/* const lastFour = result.credit_card_num.slice(-4); */}
                </ul>
                {this.state.RoomInfo.map((room, i) => (
                    <div key={room.res_room_id}>
                        <p className="text-white">Room: {i + 1}</p>
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
                {this.state.RoomTypes.map(type => (
                    <div key={type.room_type_id}>
                        <p className="text-white">Room Types:</p>
                        <ul>
                            <li>Room Type ID: {type.room_type_id}</li>
                            <li>Room Type: {type.type}</li>
                            <li>Room Rate: {type.rate}</li>
                        </ul>
                    </div>
                ))}
                <button type="submit" className="btn btn-success" onClick={this.testNewReservation}>Submit</button>
            </div>
        );
    }
}

export default ReservationTest;