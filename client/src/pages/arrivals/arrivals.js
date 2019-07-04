import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header";
import SearchSubmit from "../../components/searchButton";
import DateRange from "../../components/dateRange/dateRange";
import api from '../../utils/api';
import { Container, Table } from 'react-bootstrap';

const todayDate = new Date().toISOString().slice(0, 10);

class Arrivals extends Component {
    // Setting the initial values of this.state.username and this.state.password
    state = {
        startDateRange: todayDate,
        endDateRange: undefined,
        firstname: undefined,
        lastname: undefined,
        confirmationNumber: undefined,
        arrivalsArray: []
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleFormSubmit = event => {
        const criteria = {
            startDateRange: this.state.startDateRange,
            endDateRange: this.state.endDateRange,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            confirmationNumber: this.state.confirmationNumber
        };
        event.preventDefault();
        api.getArrivals(criteria)
            .then(res => this.setState({ arrivalsArray: res }))
            .catch(err => console.log(err));
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
                                        <Col xl={6}>
                                            <DateRange />
                                        </Col>

                                        <Col xl={2}>Confirmation Number:</Col>
                                        <Col xl={1}>
                                            <input
                                                type="tel"
                                                placeholder="Confirmation Number"
                                                name="confirmationNumber"
                                                value={this.state.confirmationNumber}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>

                                    </Row>
                                    <Row style={{ marginTop: "5px" }}>
                                        <Col xl={1}>Name:</Col>
                                        <Col xl={2} style={{ marginRight: "28px" }}>
                                            <input
                                                type="text"
                                                placeholder="First Name"
                                                name="firstname"
                                                value={this.state.firstname}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                        <Col xl={2} style={{ marginRight: "-62px" }}>Last Name:</Col>
                                        <Col xl={2} style={{ marginRight: "38px" }}>
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
                                                <th>Room Number</th>
                                                <th>Room Type</th>
                                            </tr>
                                            {this.state.arrivalsArray.map(arrival => (
                                                <tr key={arrival.room_id}>
                                                    <td>{arrival.name}</td>
                                                    <td>{arrival.check_in_date}</td>
                                                    <td>{arrival.check_out_date}</td>
                                                    <td>{arrival.room_num}</td>
                                                    <td>{arrival.type}</td>
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