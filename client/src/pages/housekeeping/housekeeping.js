import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header";
import SearchSubmit from "../../components/searchButton";
import api from '../../utils/api';
import { Container, Table } from 'react-bootstrap';

class Housekeeping extends Component {

    state = {
        checked: {
            clean: false,
            dirty: false,
            outOfOrder: false,
            vacant: false,
            occupied: false,
            arrival: false,
            arrived: false,
            stayOver: false,
            dueOut: false,
            departed: false,
            notReserved: false
        },
        searchResults: []
    };

    makeAxiosCall = () => {
        api.getHouseKeepingStatus(this.state.checked)
            .then(res => this.setState({ searchResults: res }))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.makeAxiosCall();
    }

    handleCheckboxChange = event => {
        let tempState = this.state.checked;
        switch (event.target.id) {
            case "clean":
                tempState.clean = !this.state.checked.clean;
                break;
            case "dirty":
                tempState.dirty = !this.state.checked.dirty;
                break;
            case "outOfOrder":
                tempState.outOfOrder = !this.state.checked.outOfOrder;
                break;
            case "vacant":
                tempState.vacant = !this.state.checked.vacant;
                break;
            case "occupied":
                tempState.occupied = !this.state.checked.occupied;
                break;
            case "arrival":
                tempState.arrival = !this.state.checked.arrival;
                break;
            case "arrived":
                tempState.arrived = !this.state.checked.arrived;
                break;
            case "stayOver":
                tempState.stayOver = !this.state.checked.stayOver;
                break;
            case "dueOut":
                tempState.dueOut = !this.state.checked.dueOut;
                break;
            case "departed":
                tempState.departed = !this.state.checked.departed;
                break;
            case "notReserved":
                tempState.notReserved = !this.state.checked.notReserved;
                break;
            case "clearAll":
                tempState.clean = false;
                tempState.dirty = false;
                tempState.outOfOrder = false;
                tempState.vacant = false;
                tempState.occupied = false;
                tempState.arrival = false;
                tempState.arrived = false;
                tempState.stayOver = false;
                tempState.dueOut = false;
                tempState.departed = false;
                tempState.notReserved = false;

                break;
            case "selectAll":
                tempState.clean = true;
                tempState.dirty = true;
                // tempState.outOfOrder = true;
                tempState.vacant = true;
                tempState.occupied = true;
                tempState.arrival = true;
                tempState.arrived = true;
                tempState.stayOver = true;
                tempState.dueOut = true;
                tempState.departed = true;
                tempState.notReserved = true;
                break;
                default:
                    
        }
        // set all at once
        this.setState({ checked: tempState });
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
                                <Header>HOUSEKEEPING</Header>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={12}>
                                <div id="res">
                                    <Row>
                                        <Col xl={10}>
                                            <Row style={{ backgroundColor: "white", paddingTop: "5px" }}>
                                                <Col xl={3}>
                                                    <h6 style={{ textAlign: "left" }}>Room Status: </h6>
                                                </Col>
                                                <Col xl={1}>
                                                    <p>Clean </p>
                                                </Col>
                                                <Col xl={1}>
                                                    <input type="checkbox" id="clean" checked={this.state.checked.clean}
                                                        onChange={this.handleCheckboxChange} />
                                                </Col>
                                                <Col xl={1}>
                                                    <p>Dirty {this.state.rooms}</p>
                                                </Col>
                                                <Col xl={1}>
                                                    <input type="checkbox" id="dirty" checked={this.state.checked.dirty}
                                                        onChange={this.handleCheckboxChange} />
                                                </Col>
                                                {/* <Col xl={2}>
                                                    <p>Out of Order{this.state.rooms}</p>
                                                </Col>
                                                <Col xl={1}>
                                                    <input type="checkbox" id="outOfOrder" checked={this.state.checked.outOfOrder}
                                                        onChange={this.handleCheckboxChange} />
                                                </Col> */}
                                            </Row>
                                        </Col>
                                        <Col xl={2} style={{ textAlign: "center" }}>
                                            <button type="button" className="btn btn-success" id="selectAll" checked={this.state.checked.selectAll}
                                                onClick={this.handleCheckboxChange}> Select All </button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={10}>
                                            <Row style={{ paddingTop: "8px" }}>
                                                <Col xl={3}>
                                                    <h6> Front Office Status: </h6>
                                                </Col>
                                                <Col xl={1}>
                                                    <p>Vacant</p>
                                                </Col>
                                                <Col xl={1}>
                                                    <input type="checkbox" id="vacant" checked={this.state.checked.vacant}
                                                        onChange={this.handleCheckboxChange} />

                                                </Col>
                                                <Col xl={1}>
                                                    <p>Occupied </p>
                                                </Col>
                                                <Col xl={1}>
                                                    <input type="checkbox" id="occupied" checked={this.state.checked.occupied}
                                                        onChange={this.handleCheckboxChange} />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xl={2} style={{ textAlign: "center" }}>
                                            <button type="button" className="btn btn-success" id="clearAll" checked={this.state.checked.clearAll}
                                                onClick={this.handleCheckboxChange}>Clear All </button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={10}>
                                            <Row style={{ backgroundColor: "white", paddingTop: "8px" }}>
                                                <Col xl={3}>
                                                    <h6> Reservation Status: </h6>
                                                </Col>
                                                <Col xl={1}>
                                                    <p>Arrival</p>
                                                </Col>
                                                <Col xl={1}>
                                                    <input type="checkbox" id="arrival" checked={this.state.checked.arrival}
                                                        onChange={this.handleCheckboxChange} />
                                                </Col>
                                                <Col xl={1}>
                                                    <p>Arrived</p>
                                                </Col>
                                                <Col xl={1}>
                                                    <input type="checkbox" id="arrived" checked={this.state.checked.arrived}
                                                        onChange={this.handleCheckboxChange} />
                                                </Col>

                                                <Col xl={2}>
                                                    <p>Stay Over</p>
                                                </Col>
                                                <Col xl={1}>
                                                    <input type="checkbox" id="stayOver" checked={this.state.checked.stayOver}
                                                        onChange={this.handleCheckboxChange} />
                                                </Col>
                                            </Row>
                                            <Row style={{paddingTop: "8px",backgroundColor: "white" }}>
                                                <Col xl={3}>
                                                </Col>
                                                <Col xl={1}>
                                                    <p>Departed</p>
                                                </Col>
                                                <Col xl={1}>
                                                    <input type="checkbox" id="departed" checked={this.state.checked.departed}
                                                        onChange={this.handleCheckboxChange} />
                                                </Col>
                                                <Col xl={1}>
                                                    <p>Due Out</p>
                                                </Col>
                                                <Col xl={1}>
                                                    <input type="checkbox" id="dueOut" checked={this.state.checked.dueOut}
                                                        onChange={this.handleCheckboxChange} />
                                                </Col>

                                                <Col xl={2}>
                                                    <p>Not Reserved</p>
                                                </Col>
                                                <Col xl={1}>
                                                    <input type="checkbox" id="notReserved" checked={this.state.checked.notReserved}
                                                        onChange={this.handleCheckboxChange} />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xl={2} style={{ marginTop: "30px", textAlign: "center" }}>
                                            <SearchSubmit handleFormSubmit={this.handleFormSubmit} />
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
                                                        Room
                                                    </th>
                                                    <th>
                                                        Room Type
                                                    </th>
                                                    <th>
                                                        Room Status
                                                    </th>
                                                    <th>
                                                        Front Office Status
                                                    </th>
                                                    <th>
                                                        Reservation Status

                                                    </th>
                                                </tr>
                                                    {this.state.searchResults.map(room => (
                                                        <tr key={room.room_num}>
                                                            <td>{room.room_num}</td>
                                                            <td>{room.type}</td>
                                                            <td>
                                                                {room.active === 0 ? room.inactive : (room.clean === 1 ? "Clean" : "Dirty")}
                                                            </td>
                                                            <td>{room.occupied === 1 ? "Occupied" : "Vacant"}</td>
                                                            <td>
                                                                {room.checked_out === 1 ? "Departed" : (room.departure ? room.departure : ((room.stayover ? room.stayover : ((room.checked_in === 1 ? "Arrived" : (room.arrival ? room.arrival : "Not Reserved"))))))}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default Housekeeping;