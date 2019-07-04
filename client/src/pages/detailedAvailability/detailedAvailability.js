import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import api from '../../utils/api';
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
        availableRooms: [],
        searchDate: "2019-07-03"
    };

    componentDidMount() {

        api.getAvailableRooms(this.state.searchDate)
            .then(res => this.setState({ availableRooms: res }))
            .catch(err => console.log(err));
    }

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
                                <div id="res">

                                    <Row style={{ paddingBottom: "20px" }}>
                                        <Col xl={12}>
                                            <Table>
                                                <tr>
                                                    <th className="th" id="date" colspan="2">Date</th>

                                                    <th className="th" id="total" > Total</th>
                                                    {this.state.availableRooms.map(type => (
                                                        <th key="type.room_type_id" className="th">{type.type}</th>
                                                    ))}

                                                </tr>
                                                <tr>
                                                    <td className="tableTD" >{this.state.selectedDate && moment(this.state.selectedDate).format("dddd")}</td>
                                                    <td className="tableTD" >{this.state.selectedDate} </td>
                                                    <td className="tableTD" > 10</td>
                                                    {this.state.availableRooms.map(type => (
                                                        <td key="type.room_type_id" className="tableTD">{type.available}</td>
                                                    ))}
                                                </tr>
                                            </Table>
                                        </Col>

                                    </Row>
                                </div>
                            </Col >
                        </Row >
                    </Col>
                </Row>
            </Container >

        )
    }
}



export default DetailedAvailability;
