import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header"
import SearchSubmit from "../../components/searchButton";
import DateRange from "../../components/dateRange/dateRange";
import { Container, Table } from 'react-bootstrap';

class Inhouse extends Component {
    // Setting the initial values of this.state.username and this.state.password
    state = {
        name: "",
        lastname: "",
        phonenumber: "",
        address: {
            street: "",
            state: "",
            city: "",
            zipcode: ""
        },
        arrivaldate: "",
        departuredate: "",
        nights: "",
        adults: "",
        noOfRooms: "",
        roomType: [
            { value: "Two Queens", label: "Two Queens" },
            { value: "King", label: "King" },
            { value: "Suite", label: "Suite" },
        ],
        creditCard: "",
        expirationDate: "",
        selectedOption: ["101", "102", "103", "104", "105", "106", "107", "108", "109", "110"],

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

    // When the form is submitted, prevent the default event and alert the username and password
    handleFormSubmit = event => {
        event.preventDefault();
        alert(`Username: ${this.state.username}\nPassword: ${this.state.password}`);
        this.setState({ username: "", password: "" });
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
                                <Header>IN-HOUSE GUESTS</Header>
                            </Col>
                        </Row>
                        <div id="res" style={{ paddingBottom: "10px" }}>
                            <Row>
                                <Col xl={10}>
                                    <Row style={{ marginTop: "5px" }}>
                                        <Col xl={1}>
                                            Room:
                                        </Col>
                                        <Col xl={3} style={{ marginRight: "32px" }}>
                                            <input
                                                id=""
                                                // value={roomNumber}
                                                onChange={this.handleChange}
                                                options={selectedOption}
                                                name="roomnumber"
                                                placeholder="Room Number"
                                                value={this.state.roomNumber}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                        <Col xl={3} style={{paddingLeft:"23px",  marginRight:"-17px"}}>
                                            Confirmation Number:
                                    </Col>
                                        <Col xl={1} style={{paddingLeft:"-25px"}}>
                                            <input
                                                type="tel"
                                                placeholder="Confirmation Number"
                                                name="guestlastname"
                                                value={this.state.lastname}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                
                                    </Row>
                                    <Row style={{paddingTop:"3px"}}>
                                        <Col xl={1}>
                                            Arrival:
                                        </Col>
                                        <Col xl={8}>
                                            <DateRange />
                                        </Col>
                                    </Row>
                                    <Row style={{paddingTop:"3px"}}>
                                    <Col xl={1}>
                                            Name:
                                        </Col>
                                        <Col xl={3} style={{ marginRight: "35px" }}>
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                name="guestname"
                                                value={this.state.guestname}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                        <Col xl={3}style={{paddingLeft:"31px", marginRight:"-20px"}}>
                                            Last Name:
                                </Col>
                                        <Col xl={2} style={{paddingLeft:"-25px"}}>
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
                            <Row style={{ paddingTop: "5px", paddingBottom: "5px" }}>
                                <Col xl={12}>
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <th>
                                                    Name
                                             </th>
                                                <th>
                                                    Arrival Date
                                                    </th>
                                                <th>
                                                    Departure Date
                                                    </th>
                                                <th>
                                                    Room Number
                                                    </th>
                                                <th>
                                                    Room Type
                                                    </th>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>

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

export default Inhouse;
