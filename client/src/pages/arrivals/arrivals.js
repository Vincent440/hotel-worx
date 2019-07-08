import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header";
import SearchSubmit from "../../components/searchButton";
import DateRange from "../../components/dateRange/dateRange";
import api from '../../utils/api';
import moment from "moment";
import { Container, Table } from 'react-bootstrap';

const today = moment().format("YYYY-MM-DD");

class Arrivals extends Component {
    constructor(props) {
        super(props);
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);

    }

    // Setting the initial values of this.state.username and this.state.password
    state = {
        startDateRange: "",
        endDateRange: "",
        firstname: undefined,
        lastname: undefined,
        confirmationNumber: undefined,
        arrivalsArray: [],
        roomsArray: []
    };
    showFromMonth() {
        const { from, to } = this.state;
        if (!from) {
            return;
        }
        if (moment(to).diff(moment(from), 'months') < 2) {
            this.to.getDayPicker().showMonth(from);
        }
    }
    handleFromChange(startDateRange) {
        // Change the from date and focus the "to" input field
        this.setState({ startDateRange });

    }
    handleToChange(endDateRange) {
        this.setState({ endDateRange }, this.showFromMonth);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    makeAxiosCall = () => {
        const criteria = {
            startDateRange: moment(this.state.startDateRange).format('YYYY-MM-DD'),
            endDateRange: moment(this.state.endDateRange).format('YYYY-MM-DD'),
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            confirmationNumber: this.state.confirmationNumber
        };

        api.getArrivals(criteria)
            .then(res => this.setState({ arrivalsArray: res }))
            .catch(err => console.log(err));
    }

    handleCheckIn = (id, room_id) => {
        // updateRoomCheckin
        api.updateRoomCheckin(id, room_id)
            .then(res => this.makeAxiosCall())
            .catch(err => console.log(err));
    }

    componentDidMount() {
        api.getRoomsArrivals()
            .then(res => this.setState({ roomsArray: res }))
            .catch(err => console.log(err));
        this.makeAxiosCall();
        // api.getRoomsArrivals()
        //     .then(res => this.setState({ rooms: res }, () => {
        //         this.makeAxiosCall();
        //     }))
        //     .catch(err => console.log(err));
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleRoomChange = event => {
        const { id, value } = event.target;
        console.log(id, value);
        let arrivalsArray = [...this.state.arrivalsArray];
        arrivalsArray[id].selectedRoom = value;
        this.setState({ arrivalsArray });
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.makeAxiosCall();
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
                            <Col xl={12}>
                                <Header>ARRIVALS</Header>
                            </Col>
                        </Row>
                        <div id="res" style={{ paddingBottom: "10px" }}>
                            <Row>
                                <Col xl={10}>
                                    <Row>
                                        <Col xl={1}>Arrival</Col>
                                        <Col xl={8}>
                                            <DateRange
                                                handleFromChange={this.handleFromChange}
                                                handleToChange={this.handleToChange}
                                                from={this.state.startDateRange}
                                                to={this.state.endDateRange}
                                            />
                                        </Col>
                                    </Row>

                                    <Row style={{ marginTop: "5px" }}>
                                        <Col xl={1}>Name:</Col>
                                        <Col xl={3}>
                                            <input
                                                type="text"
                                                placeholder="First Name"
                                                name="firstname"
                                                value={this.state.firstname}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                        <Col xl={3} style={{ paddingLeft: "67px" }}>Last Name:</Col>
                                        <Col xl={2}>
                                            <input
                                                type="text"
                                                placeholder="Last Name"
                                                name="lastname"
                                                value={this.state.lastname}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                    </Row>
                                </Col>

                                <Col xl={2} style={{ paddingTop: "25px", Left: "30px" }}>
                                    <Col xl={12}>
                                        <SearchSubmit handleFormSubmit={this.handleFormSubmit} />
                                    </Col>
                                </Col>
                            </Row>
                        </div>
                        <div id="res">
                            <Row style={{ paddingTop: "5px", paddingBottom: "5px" }}>
                                <Col xl={12}>
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <th>Name</th>
                                                <th>Arrival Date</th>
                                                <th>Departure Date</th>
                                                <th>Room Type</th>
                                                <th>Room Number</th>
                                                <th></th>
                                            </tr>
                                            {this.state.arrivalsArray.map((arrival, i) => (
                                                <tr key={arrival.res_room_id}>
                                                    <td>{arrival.name}</td>
                                                    <td>{arrival.check_in_date}</td>
                                                    <td>{arrival.check_out_date}</td>
                                                    <td>{arrival.type}</td>
                                                    <td>
                                                        {arrival.room_num === "Not Set" ?
                                                            <select id={i} onChange={this.handleRoomChange}>
                                                                <option value="">Select a room</option>
                                                                {this.state.roomsArray.filter(roomtype => roomtype.room_type_id == arrival.room_type_id).map(room => (
                                                                    <option key={room.room_id} value={room.room_id}>{room.room_num}</option>
                                                                ))}
                                                            </select> :
                                                            arrival.room_num}
                                                    </td>
                                                    <td>
                                                        {arrival.checked_in === 0 ? <button onClick={() => this.handleCheckIn(arrival.res_room_id, this.state.arrivalsArray[i].selectedRoom)}>Check In</button> : "Checked In"}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </Table>
                                </Col>
                            </Row >
                        </div>
                    </Col>
                </Row >
            </Container >
        )
    }
}

export default Arrivals;