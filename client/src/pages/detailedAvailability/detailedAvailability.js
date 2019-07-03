import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import DeatiledSubmit from "../../components/detailedSubmit";
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header";
import moment from "moment";
import { Container, Table } from 'react-bootstrap';

class DetailedAvailability extends Component {
    // Setting the initial values of this.state.username and this.state.password
    state = {
        selectedDate: "",
        nights: "",
        noOfRooms: "",
        roomType: "",
        availabilit: "",
        occupied: "",
    };

    handleStartDate = event => {
        this.setState({ selectedDate: event.target.value })
    }


    render() {
        return (
            <Container>
                <Row >
                    <Col xl={2}>
                        <InfoPart />
                    </Col>
                    <Col xl={10}>
                        <Row>
                            <Col xl={12}>
                                <Header>DETAILED AVAILABILITY</Header>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={12}>
                                <div id="res">
                                    <Row>
                                        <DeatiledSubmit
                                            handleStartDate={this.handleStartDate}
                                        />
                                    </Row>
                                </div>
                            </Col>
                        </Row>

                        <div id="res">
                            <Row style={{ paddingTop: "5px", paddingBottom: "5px" }}>
                                <Col xl={12}>
                                    <Table>
                                        <tr>
                                            <th>
                                                Date
                                                    </th>
                                            <th>
                                                Total                                                    </th>
                                            <th>
                                                Two Queens                                                    </th>
                                            <th>
                                                King                                                    </th>
                                            <th>
                                                Suite
                                                    </th>
                                        </tr>

                                        <tr>
                                            <td>{this.state.selectedDate && moment(this.state.selectedDate).format("dddd")}</td>
                                            <td>{this.state.selectedDate}</td>
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

                                    </Table>
                                </Col>


                            </Row >
                        </div>
                    </Col>
                </Row>
            </Container>

        )
    }
}



export default DetailedAvailability;
