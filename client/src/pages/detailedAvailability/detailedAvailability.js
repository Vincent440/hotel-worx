import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import api from '../../utils/api';
import DeatiledSubmit from "../../components/detailedSubmit";
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header";
import moment from "moment";
import { Container, Table } from 'react-bootstrap';

const today = moment().format("YYYY-MM-DD");

class DetailedAvailability extends Component {
    state = {
        selectedDate: today,
        nights: "",
        noOfRooms: "",
        roomType: "",
        availabilit: "",
        occupied: "",
        availableRooms: [],
        roomTypes: []
    };

    componentDidMount() {
        this.makeAxiosCall();
    }

    makeAxiosCall = () => {
        api.getAvailableRooms(this.state.selectedDate)
            .then(res => this.setState({ roomTypes: res.roomTypes, availableRooms: res.typeData }))
            .catch(err => console.log(err));
    }

    handleStartDate = event => {
        this.setState({ selectedDate: event.target.value })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        this.makeAxiosCall();
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
                                        <DeatiledSubmit handleFormSubmit={this.handleFormSubmit} handleStartDate={this.handleStartDate} />
                                    </Row>
                                </div>
                                <div id="res">

                                    <Row style={{ paddingBottom: "20px" }}>
                                        <Col xl={12}>
                                            <Table>
                                                <tr>
                                                    <th className="th" id="date">Date</th>
                                                    {this.state.roomTypes.map(type => (
                                                        <th key={type.room_type_id} className="th">{type.type}</th>
                                                    ))}
                                                    <th className="th" id="total" >Total Rooms</th>
                                                </tr>
                                                {this.state.availableRooms.map(tot => (
                                                    <tr key={tot.date}>
                                                        <td className="tableTD">{tot.date} ({moment(tot.date).format("dddd")})</td>
                                                        {/* <td className="tableTD">{tot.date}</td> */}
                                                        <td className="tableTD">{tot.RoomType1}</td>
                                                        <td className="tableTD">{tot.RoomType2}</td>
                                                        <td className="tableTD">{tot.RoomType3}</td>
                                                        <td className="tableTD">{tot.TotalRooms}</td>
                                                    </tr>
                                                ))}
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
