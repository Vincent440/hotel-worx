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
                                <Col xl={12}>

                                    <Row style={{ paddingBottom: "15px" }}>
                                        <Col xl={2}>
                                            Room Number
                                        </Col>
                                        <Col xl={2}>
                                            <input
                                                id=""
                                                onChange={this.handleChange}
                                                options={selectedOption}
                                                name="roomNumber"
                                                placeholder="Room Number"
                                                value={this.state.roomNumber}
                                                onChange={this.handleInputChange}
                                            /></Col>
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

                                    <Row style={{ paddingBottom: "5px", paddingTop: "5px", marginRight: "0px", marginLeft: "0px" }}>
                                        <Col xl={10}>
                                            <Row>
                                                <Col xl={2}>
                                                    Stay Over
</Col>
                                                <Col xl={1}>
                                                    <input type="checkbox" id="myCheck" />
                                                </Col>

                                                <Col xl={2}>
                                                    Due Out
</Col>
                                                <Col xl={1}>
                                                    <input type="checkbox" id="myCheck" />
                                                </Col>

                                                <Col xl={2}>
                                                    Checked Out
</Col>
                                                <Col xl={1}>
                                                    <input type="checkbox" id="myCheck" />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xl={2}>
                                            <SearchSubmit />
                                        </Col>

                                    </Row>
                                </Col>
                            </Row>


                        </div>
                        <div id="res">

                            <Row style={{ paddingBottom: "20px" }}>
                                <Col xl={12}>
                                    <Table>
                                        <tbody>
                                            <tr>

                                                <th className="th" id="room number">Room Number</th>
                                                <th className="th" >Name</th>
                                                <th className="th" id="arrival date">Arrival Date</th>
                                                <th className="th" id="departure date">Departure Date</th>
                                                <th className="th" id="balance">Balance</th>
                                                <th className="th" id="status">Status</th>

                                            </tr>

                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
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
