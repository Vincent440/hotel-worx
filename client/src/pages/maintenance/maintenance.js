import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header";
import SearchSubmit from "../../components/searchButton";
import api from '../../utils/api';
import moment from "moment";
import { Container, Table } from 'react-bootstrap';
import Particles from "react-particles-js";
import DateRange from "../../components/dateRangeOrg/dateRange";


const particleOpt = { particles: { number: { value: 120, density: { enable: true, value_area: 1000 } } } };
const today = moment().format("YYYY-MM-DD");

class Maintenance extends Component {
    constructor(props) {
        super(props);
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    state = {
        startDateRange: today,
        endDay: "",
        firstname: undefined,
        lastname: undefined,
        confirmationNumber: undefined,
        roomsArray: [],
        pendingArray: []
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

    handleToChange(endDay) {
        this.setState({ endDay }, this.showFromMonth);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    makeAxiosCall = () => {
        const criteria = {
            startDateRange: moment(this.state.startDateRange).format('YYYY-MM-DD'),
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            confirmationNumber: this.state.confirmationNumber
        };

        api.getArrivalsNew(criteria, moment(this.state.startDateRange).format('YYYY-MM-DD'))
            .then(res => this.setState({ arrivalsArray: res.arrivals, roomsArray: res.rooms_arrivals, pendingArray: res.pending_departures }))
            .catch(err => console.log(err));
    }

    handleCheckIn = (id, room_id) => {
        api.updateRoomCheckin(id, room_id)
            .then(res => this.makeAxiosCall())
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.makeAxiosCall();
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
                <Particles params={particleOpt} id="particul" />

                <Row>
                    <Col xs={6} sm={4} md={3} lg={3} xl={2}>
                        <InfoPart user={this.props.user} logout={this.props.logout} />
                    </Col>
                    <Col xs={6} sm={8} md={9} lg={9} xl={10}>
                        <Row>
                            <Col xl={12}>
                                <Header>MAINTENANCE</Header>
                            </Col>
                        </Row>
                        <div id="res" style={{ paddingBottom: "10px" }}>
                            <Row>
                                <Col xl={12}>
                                    <Row>
                                        <Col xl={1}>Date</Col>
                                        <Col xl={3} >
                                            <input
                                                style={{ paddingTop: "0px", paddingBottom: "0px" }}
                                                type="date"
                                                name="arrivaldate"
                                                value={this.state.startDateRange}
                                            />
                                        </Col>

                                        <Col xs={6} sm={6} md={6} lg={3} xl={2} >Room Number</Col>
                                        <Col xs={6} sm={6} md={6} lg={3} xl={2}>
                                            <input style={{ width: "150px" }}
                                                id=""
                                                onChange={this.handleInputChange}
                                                name="roomNumber"
                                                placeholder="Room Number"
                                                value={this.state.roomNumber}
                                            />
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={1} xl={1}>
                                            <SearchSubmit handleFormSubmit={this.handleFormSubmit} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                        <div id="res" style={{ paddingBottom: "10px" }}>
                            <Row>
                                <Col xl={3}>
                                </Col>
                                <Col xl={2}>
                                    <bold>Add new work order</bold>
                                </Col>
                                <Col xl={6}>
                                    <input type="checkbox" id="notReserved" />
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={12}>
                                    <Row>
                                        <div id="workOrder">
                                            <Col xl={1}>
                                                Date
                                        </Col>
                                            <Col xl={11}>
                                                <div>
                                                    <DateRange
                                                        handleFromChange={this.handleFromChange}
                                                        handleToChange={this.handleToChange}
                                                        from={this.state.startDateRange}
                                                        to={this.state.endDay}
                                                    />
                                                </div>
                                            </Col>
                                        </div>
                                    </Row>
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
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>
                                                </td>
                                                <td>

                                                </td>
                                            </tr>

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

export default Maintenance;
