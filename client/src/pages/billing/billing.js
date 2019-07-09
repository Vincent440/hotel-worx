import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart"
import Header from "../../components/Header";
import SearchSubmit from "../../components/searchButton"
import { Container, Table } from 'react-bootstrap';


class Billing extends Component {
    // Setting the initial values of this.state.username and this.state.password
    state = {
        name: "",
        lastname: "",
        arrivaldate: "",
        departuredate: "",
        nights: "",
        adults: "",
        noOfRooms: "",
        roomType: "",
    };

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    }


    // handle any changes to the input fields
    handleInputChange = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { name, value } = event.target;

        // Set the state for the appropriate input field
        this.setState({
            [name]: value
        });
    }

    render() {


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
                                <Header>FINANCE</Header>
                            </Col>
                        </Row>
                        <div id="res" style={{ paddingBottom: "10px" }}>
                            <Row>
                                <Col sm={4}>

                                    <Row style={{ paddingBottom: "5px" }}>

                                        <Col sm={6} >
                                            Room Number
                                        </Col>

                                        <Col sm={6}>
                                            <input
                                                id=""
                                                onChange={this.handleChange}
                                                options={selectedOption}
                                                name="roomNumber"
                                                placeholder="Room Number"
                                                value={this.state.roomNumber}
                                            /></Col>
                                    </Row>
                                    <Row style={{ paddingBottom: "5px" }}>
                                        <Col sm={6}>
                                            Name
                                        </Col>
                                        <Col sm={6}>
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                name="guestname"
                                                value={this.state.guestname}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6} style={{ paddingRight: "30px" }}>
                                            Last Name
                                    </Col>
                                        <Col sm={6}>
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
                                <Col xl={2} style={{marginTop:"30px"}}>
                                    <SearchSubmit />
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
                                                <th>Status</th>

                                            </tr>

                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td><button>Check Out</button></td>
                                            </tr>
                                        </tbody>
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

export default Billing;
