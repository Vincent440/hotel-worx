import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header"
import SearchSubmit from "../../components/searchButton";
import api from '../../utils/api';

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
                tempState.outOfOrder = true;
                tempState.vacant = true;
                tempState.occupied = true;
                tempState.arrival = true;
                tempState.arrived = true;
                tempState.stayOver = true;
                tempState.dueOut = true;
                tempState.departed = true;
                tempState.notReserved = true;
                break;

        }
        // set all at once
        this.setState({ checked: tempState });
    }

    handleSearch = (event) => {
        event.preventDefault();
        // console.log("handlesearch, state=", this.state.checked);
        api.getHouseKeepingStatus(this.state.checked)
            .then(res => this.setState({ searchResults: res }))
            .catch(err => console.log(err));
    }

    render() {
        return (

            <Row id="dashboardTable1">
                <InfoPart />
                <Col sm={10}>
                    <row>
                        <form>
                            <Header>HOUSEKEEPING</Header>
                            <div id="res">
                                <tr>
                                    <td>
                                        <tr>
                                            <h5 style={{ textAlign: "left" }}>Room Status: </h5>
                                            <td><p>Clean </p></td>
                                            <input type="checkbox" id="clean" checked={this.state.checked.clean}
                                                onChange={this.handleCheckboxChange} />

                                            <td><p>Dirty{this.state.rooms}</p></td>
                                            <input type="checkbox" id="dirty" checked={this.state.checked.dirty}
                                                onChange={this.handleCheckboxChange} />

                                            <td><p>Out of Order{this.state.rooms}</p></td>
                                            <input type="checkbox" id="outOfOrder" checked={this.state.checked.outOfOrder}
                                                onChange={this.handleCheckboxChange} />

                                        </tr>
                                        <tr>
                                            <h5> Front Office Status: </h5>
                                            <td><p>Vacant {this.state.rooms}</p></td>
                                            <input type="checkbox" id="vacant" checked={this.state.checked.vacant}
                                                onChange={this.handleCheckboxChange} />

                                            <td><p>Occupied </p></td>
                                            <input type="checkbox" id="occupied" checked={this.state.checked.occupied}
                                                onChange={this.handleCheckboxChange} />
                                        </tr>
                                        <tr>
                                            <h5> Reservation Status: </h5>
                                            <td><p>Arrival</p></td>
                                            <input type="checkbox" id="arrival" checked={this.state.checked.arrival}
                                                onChange={this.handleCheckboxChange} />

                                            <td><p>Arrived</p></td>
                                            <input type="checkbox" id="arrived" checked={this.state.checked.arrived}
                                                onChange={this.handleCheckboxChange} />

                                            <td><p>Stay Over</p></td>
                                            <input type="checkbox" id="stayOver" checked={this.state.checked.stayOver}
                                                onChange={this.handleCheckboxChange} />

                                            <td><p>Due Out</p></td>
                                            <input type="checkbox" id="dueOut" checked={this.state.checked.dueOut}
                                                onChange={this.handleCheckboxChange} />

                                            <td><p>Departed</p></td>
                                            <input type="checkbox" id="departed" checked={this.state.checked.departed}
                                                onChange={this.handleCheckboxChange} />

                                            <td><p>Not Reserved</p></td>
                                            <input type="checkbox" id="notReserved" checked={this.state.checked.notReserved}
                                                onChange={this.handleCheckboxChange} />

                                        </tr>
                                    </td>
                                    <td>
                                        <tr>
                                            <td>
                                                <button type="button" class="btn btn-success" id="selectAll" checked={this.state.checked.selectAll}
                                                    onClick={this.handleCheckboxChange}> Select All </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <button type="button" class="btn btn-success" id="clearAll" checked={this.state.checked.clearAll}
                                                    onClick={this.handleCheckboxChange}>Clear All </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {/* <SearchSubmit /> */}
                                                <button type="button" class="btn btn-primary" style={{ marginLeft: "40%" }} onClick={this.handleSearch}>Search</button>
                                            </td>
                                        </tr>
                                    </td>
                                </tr>
                            </div>
                        </form>
                        <div id="guestinfo">
                            <table id="result">
                                <thead>
                                    <tr>
                                        <th className="th" id="room number">Room</th>
                                        <th className="th" id="room type" > Room Type</th>
                                        <th className="th" id="roomStatus">Room Status</th>
                                        <th className="th" id="foStatus">Front Office Status</th>
                                        <th className="th" id="status">Reservation Status</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.searchResults.map(room => (
                                        <tr key="room.room_id">
                                            <td>{room.room_num}</td>
                                            <td>{room.type}</td>
                                            <td>
                                                {room.active === 1 ? "" : "Out of Service - "}
                                                {room.clean === 1 ? "Clean" : "Dirty"}
                                            </td>
                                            <td>{room.occupied === 1 ? "Occupied" : "Empty"}</td>
                                            <td>
                                                {room.checked_in === 1 ? "Arrived" : ""}
                                                {room.checked_out === 1 ? "Departed" : ""}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </row>
                </Col >
            </Row >
        )
    }
}

export default Housekeeping;