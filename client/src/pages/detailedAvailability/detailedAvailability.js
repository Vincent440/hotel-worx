import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import api from '../../utils/api';
import DeatiledSubmit from "../../components/detailedSubmit";
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header";
import moment from "moment";
import { Container, Table } from 'react-bootstrap';

const todayDate = new Date().toISOString().slice(0, 10);

class DetailedAvailability extends Component {
    state = {
        selectedDate: "",
        nights: "",
        noOfRooms: "",
        roomType: "",
        availabilit: "",
        occupied: "",
        availableRooms: [],
        roomTypes: [],
        searchDate: todayDate
    };

    componentDidMount() {
        api.getAvailableRooms(this.state.searchDate)
            .then(res => this.setState({ roomTypes: res.roomTypes, availableRooms: res.typeData }))
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
                                                <tbody>
                                                    <tr>
                                                        <th className="th" id="date">Date</th>
                                                        {this.state.roomTypes.map(type => (
                                                            <th key="type.room_type_id" className="th">{type.type}</th>
                                                        ))}
                                                        <th className="th" id="total" >Total Rooms</th>
                                                    </tr>
                                                    {/* <td className="tableTD" >{this.state.searchDate && moment(this.state.searchDate).format("dddd")}</td> */}
                                                    {this.state.availableRooms.map(tot => (
                                                        <tr key="type.date">
                                                            <td className="tableTD">{tot.date}</td>
                                                            <td className="tableTD">{tot.RoomType1}</td>
                                                            <td className="tableTD">{tot.RoomType2}</td>
                                                            <td className="tableTD">{tot.RoomType3}</td>
                                                            <td className="tableTD">{tot.TotalRooms}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>

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
