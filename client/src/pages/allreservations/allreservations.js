import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header";
import SearchSubmit from "../../components/searchButton";
import DateRange from "../../components/dateRange/dateRange";
import { Container, Table } from 'react-bootstrap';
import api from '../../utils/api';

class UpdateReservation extends Component {
    // Setting the initial values of this.state.username and this.state.password
    state = {
        criteria: {
            firstname: "",
            lastname: "",
            sdate: "",
            edate: "",
            confirmationNumber: ""
        },
        resRooms: []
    };

    componentDidMount() {
        this.makeAxiosCall();
    }

    makeAxiosCall = () => {
        api.getReservations(this.state.criteria)
            .then(res => this.setState({ resRooms: res }))
            .catch(err => console.log(err));
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.makeAxiosCall();

    }

    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

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
            <Container>
                <Row>
                    <Col sm={2}>
                        <InfoPart />
                    </Col>
                    <Col sm={10}>
                        <Row>
                            <Col xl={12}>
                                <Header>ALL RESERVATIONS</Header>
                            </Col>
                        </Row>
                        <div id="res" style={{ paddingBottom: "10px" }}>
                            <Row>
                                <Col xl={10}>
                                    <Row>
                                        <Col xl={1}>
                                            Date
                                        </Col>
                                        <Col xl={6}>
                                            <DateRange />
                                        </Col>
                                        <Col xl={2}>
                                            Confirmation Nmb
                                        </Col>
                                        <Col xl={2}>
                                            <input
                                                type="tel"
                                                placeholder="Confirmation Number"
                                                name="confirmation"
                                                value={this.state.confirmation}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                    </Row>

                                    <Row style={{ marginTop: "5px" }}>
                                        <Col xl={1}>
                                            Name
                                        </Col>
                                        <Col xl={2}>
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                name="guestname"
                                                value={this.state.guestname}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                        <Col xl={4}>
                                        </Col>
                                        <Col xl={2}>
                                            Last Name
                                            </Col>

                                        <Col xl={2}>
                                            <input
                                                type="text"
                                                placeholder="Last Name"
                                                name="guestlastname"
                                                value={this.state.lastname}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                    </Row>
                                </Col>

                                <Col xl={2} style={{ paddingTop: "25px", Left: "30px" }}>
                                    <Col xl={12}>
                                        <SearchSubmit />

                                    </Col>
                                </Col>
                            </Row>
                        </div>
                        <div id="res">

                            <Row style={{ paddingBottom: "20px" }}>
                                <Col xl={12}>
                                    <Table>
                                        <tr>
                                            <th>
                                                Last Name
                                                    </th>
                                            <th>
                                                First Name
                                                    </th>
                                            <th>
                                                Arrival Date
                                             </th>
                                            <th>
                                                Departure Date
                                             </th>
                                            <th>
                                                Room Type
                                                    </th>
                                            <th>
                                                Status
                                              </th>
                                        </tr>

                                        {this.state.resRooms.map(res => (
                                            <tr key={res.res_room_id}>
                                                <td>{res.last_name}</td>
                                                <td>{res.first_name}</td>
                                                <td>{res.check_in_date}</td>
                                                <td>{res.check_out_date}</td>
                                                <td>{res.type}</td>
                                                <td>
                                                    {res.active === 1 ? "Active" : "Cancelled"}
                                                </td>
                                            </tr>
                                        ))}

                                    </Table>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                </Row >
            </Container >
        )
    }
}

export default UpdateReservation;
