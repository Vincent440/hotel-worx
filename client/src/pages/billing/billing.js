import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart"
import Header from "../../components/Header";
import SearchSubmit from "../../components/searchButton";
import { Container, Table } from 'react-bootstrap';
import api from '../../utils/api';

class Billing extends Component {
    state = {
        firstname: "",
        lastname: "",
        arrivaldate: "",
        departuredate: "",
        departuresArray: [],
        roomNumber: "",
        taxRates: {},
        checkOutSuccess: false,
        res_room_id: "",
        invoice_id: ""
    };

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
        this.setState({ res_room_id: id });
        api.updateRoomCheckout(id, room_id)
            .then(res => this.setState({ checkOutSuccess: true, invoice_id: res[1].data }))
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

        if (this.state.checkOutSuccess) {
            localStorage.setItem('invoice_id', this.state.invoice_id);
            return (
                <Redirect to={{
                    pathname: '/cashiering/payment'
                }} />
            )
        }

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
                                        <input style={{ width: "150px" }}
                                                id=""
                                                onChange={this.handleInputChange}
                                                name="roomNumber"
                                                placeholder="Room Number"
                                                value={this.state.roomNumber}
                                            />
                                        </Col>
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
                                                    <td>${parseFloat((departure.num_days) * (departure.rate)) + parseFloat(((departure.num_days) * (departure.rate) * this.state.taxRates.county_rate).toFixed(2)) + parseFloat(((departure.num_days) * (departure.rate) * this.state.taxRates.city_rate).toFixed(2)) + parseFloat(((departure.num_days) * (departure.rate) * this.state.taxRates.state_rate).toFixed(2))}
                                                    </td>

                                                    <td>
                                                        {departure.room_num === "Not Set" ? "" : <button onClick={() => this.handleCheckOut(departure.res_room_id, this.state.departuresArray[i].room_num)}>Check Out</button>}
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