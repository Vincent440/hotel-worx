import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header"
import SearchSubmit from "../../components/searchButton";
import api from '../../utils/api';

class Housekeeping extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    };

    state = {
        checked: {
            clean: false,
            dirty: false,
            outOfOrder: false,
            vacant: false,
            occuppied: false,
            arrival: false,
            arrived: false,
            stayOver: false,
            dueOut: false,
            departed: false,
            notReserved: false
        }
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
                    tempState.clean = !this.state.checked.clean.false;
                    tempState.dirty = !this.state.checked.dirty.false;
                    tempState.outOfOrder = !this.state.checked.outOfOrder.false;
                    tempState.vacant = !this.state.checked.vacant.false;
                    tempState.occupied = !this.state.checked.occupied.false;
                    tempState.arrival = !this.state.checked.arrival.false;
                    tempState.arrived = !this.state.checked.arrived.false;
                    tempState.stayOver = !this.state.checked.stayOver.false;
                    tempState.dueOut = !this.state.checked.dueOut.false;
                    tempState.departed = !this.state.checked.departed.false;
                    tempState.notReserved = !this.state.checked.notReserved.false;

                break;
                case "selectAll":
                tempState.clean = !this.state.checked.clean.true;
                tempState.dirty = !this.state.checked.dirty.true;
                tempState.outOfOrder = !this.state.checked.outOfOrder.true;
                tempState.vacant = !this.state.checked.vacant.true;
                tempState.occupied = !this.state.checked.occupied.true;
                tempState.arrival = !this.state.checked.arrival.true;
                tempState.arrived = !this.state.checked.arrived.true;
                tempState.stayOver = !this.state.checked.stayOver.true;
                tempState.dueOut = !this.state.checked.dueOut.true;
                tempState.departed = !this.state.checked.departed.true;
                tempState.notReserved = !this.state.checked.notReserved.true;

        }
        // set all at once
        this.setState({ checked: tempState });
    }

    handleSearch = () => {
        console.log("handlesearch, state=" + this.state.checked);
        api.getHouseKeepingStatus(this.state.checked)
            .then(res => 'here you will map the packet of data that comes back')
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
                                                <button type="button" class="btn btn-success" checked={this.state.checked.notReserved}
                                                    onClicked={this.handleCheckboxChange}> Select All </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <button type="button" class="btn btn-success" checked={this.state.checked.notReserved}
                                                    onClicked={this.handleCheckboxChange}>Clear All </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <SearchSubmit />
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
                                    {/* <!-- Results from DB here --> */}
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