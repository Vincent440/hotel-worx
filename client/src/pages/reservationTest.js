import React, { Component } from 'react';
import api from '../utils/api';
import { Row, Col } from 'react-bootstrap';
import { Container, Table } from 'react-bootstrap';
import InfoPart from "../components/infoPart";
import Header from "../components/Header"


class ReservationTest extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    };

    state = {
        ReservationInfo: {},
        RoomInfo: [],
        RoomTypes: [],
        checked: {
            clean: false,
            dirty: false,
            outOfOrder: false,
            vacant: false,
            occuppied: false,
            arrival: false,
            arrived: false,
            stayOver: false,
            dueOut: false,
            departed: false,
            notReserved: false
        }
    };

    componentDidMount() {
        api.getReservation(4)
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

            <Container>
                <Row>
                    <Col sm={2}>
                        <InfoPart />
                    </Col>
                    <Col sm={10}>
                        <Row>
                            <Col sm={12}>
                                <Row>
                                    <Header> RESERVATION CONFIRMATION</Header>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        Reservation ID: {this.state.ReservationInfo.reservation_id}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        Customer First Name: {this.state.ReservationInfo.first_name}
                                    </Col>
                                    <Col sm={6}>
                                        Customer Last Name: {this.state.ReservationInfo.last_name}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={2}>
                                        Customer Address: {this.state.ReservationInfo.address}
                                    </Col>
                                    <Col sm={2}>
                                        Customer City: {this.state.ReservationInfo.city}
                                    </Col>
                                    <Col sm={2}>
                                        Customer State: {this.state.ReservationInfo.state}
                                    </Col>
                                    <Col sm={2}>
                                        Customer Zip: {this.state.ReservationInfo.zip}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Customer Email: {this.state.ReservationInfo.email}
                                    </Col>
                                    <Col>
                                        Customer Phone: {this.state.ReservationInfo.phone}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Customer Credit Card Last 4: {this.formatCC()}
                                    </Col>
                                    <Col>
                                        Customer Credit Card Exp Date: {this.state.ReservationInfo.cc_expiration}
                                    </Col>
                                </Row>
                                <Row>
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

                                    <p className="text-white">Room Types:</p>
                                    <ul>
                                        {this.state.RoomTypes.map(type => (
                                            <li key="type.room_type_id">Room Type ID: {type.room_type_id}, Room Type: {type.type}, Room Rate: {type.rate}</li>
                                        ))}
                                    </ul>

                                </Row>






                                <Row>
                                    <Col>
                                        Reservation Made by User ID: {this.state.ReservationInfo.user_id}
                                    </Col>
                                    <Col>
                                        Reservation Created On: {this.state.ReservationInfo.created_at}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>


                </Row>
            </Container>
        );
    }
}

export default ReservationTest;