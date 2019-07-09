import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart"
import Header from "../../components/Header";
import SearchSubmit from "../../components/searchButton";
import { Container, Table } from 'react-bootstrap';
import moment from 'moment';
import api from '../../utils/api';

const today = moment().format("YYYY-MM-DD");


class Billing extends Component {
    // Setting the initial values of this.state.username and this.state.password
    state = {
        firstname: "",
        lastname: "",
        arrivaldate: "",
        departuredate: "",
        departuresArray: [],
        roomNumber: "",
        taxRates: {}
    };

    // county_tax_rate, city_tax_rate, state_tax_rate

    makeAxiosCall = () => {
        const criteria = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            roomNumber: this.state.roomNumber
        };

        api.getDepartures(criteria)
            .then(res => this.setState({ departuresArray: res }))
            .catch(err => console.log(err));
    }

    handleCheckOut = (id, room_id) => {
        api.updateRoomCheckout(id, room_id)
            .then(res => this.makeAxiosCall())
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.makeAxiosCall();
        api.getTaxRates()
            .then(res => this.setState({ taxRates: res[0] }))
            .catch(err => console.log(err));
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
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
                                <Header>FINANCE</Header>
                            </Col>
                        </Row>
                        <div id="res" style={{ paddingBottom: "10px" }}>
                            <Row>
                                <Col sm={4}>
                                    <Row style={{ paddingBottom: "5px" }}>
                                        <Col sm={6} >Room Number</Col>
                                        <Col sm={6}>
                                            <input
                                                id=""
                                                onChange={this.handleChange}
                                                name="roomNumber"
                                                placeholder="Room Number"
                                                value={this.state.roomNumber}
                                            /></Col>
                                    </Row>
                                    <Row style={{ paddingBottom: "5px" }}>
                                        <Col sm={6}>First Name</Col>
                                        <Col sm={6}>
                                            <input style={{ width: "150px" }}
                                                type="text"
                                                placeholder="First Name"
                                                name="firstname"
                                                value={this.state.firstname}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6} style={{ paddingRight: "30px" }}>
                                            Last Name
                                    </Col>
                                        <Col sm={6}>
                                            <input style={{ width: "150px", height: "30px" }}
                                                type="text"
                                                placeholder="Last Name"
                                                name="lastname"
                                                value={this.state.lastname}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xl={4} style={{ paddingLeft: "60px" }}>
                                    <Row style={{ paddingBottom: "12px" }}>
                                        <Col xl={6}>
                                            Stay Over
                                        </Col>
                                        <Col xl={6}>
                                            <input type="checkbox" id="myCheck" />
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingBottom: "12px" }}>
                                        <Col xl={6}>
                                            Due Out
                                            </Col>
                                        <Col xl={6}>
                                            <input type="checkbox" id="myCheck" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={6}>
                                            Checked Out
                                                </Col>
                                        <Col xl={6}>
                                            <input type="checkbox" id="myCheck" />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                </Col>
                                <Col xl={2} style={{ marginTop: "30px" }}>
                                    <SearchSubmit handleFormSubmit={this.handleFormSubmit} />
                                </Col>

                            </Row>
                        </div>

                        <div id="res">
                            <Row style={{ paddingBottom: "20px" }}>
                                <Col xl={12}>
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <th>Room Number</th>
                                                <th>Name</th>
                                                <th>Arrival Date</th>
                                                <th>Departure Date</th>
                                                <th>Balance</th>
                                                <th></th>
                                            </tr>
                                            {this.state.departuresArray.map((departure, i) => (
                                                <tr key={departure.res_room_id}>
                                                    <td>{departure.room_num}</td>
                                                    <td>{departure.name}</td>
                                                    <td>{departure.check_in_date}</td>
                                                    <td>{departure.check_out_date}</td>
                                                    <td>
                                                        ${((departure.num_days) * (departure.rate) * (1 + (((parseFloat(this.state.taxRates.county_tax_rate) + parseFloat(this.state.taxRates.city_tax_rate) + parseFloat(this.state.taxRates.state_tax_rate)) / 100)))).toFixed(2)}
                                                    </td>

                                                    <td>
                                                        <button onClick={() => this.handleCheckOut(departure.res_room_id, this.state.arrivalsArray[i].selectedRoom)}>Check Out</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row >
            </Container>
        )
    }
}

export default Billing;