import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import api from '../../utils/api';
import DeatiledSubmit from "../../components/detailedSubmit";
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header";
import moment from  "moment";

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

    componentDidMount() {
        api.getAvailableRooms()
            .then(res => this.setState({ availableRooms: res }))
            .catch(err => console.log(err));
    }

    handleStartDate = event => {
        this.setState({ selectedDate: event.target.value })
    }

    render() {
        return (

            <Row id="dashboardTable1">

                <InfoPart />
                <Col sm={10}>
                    <row>
                        <Header>DETAILED AVAILABILITY</Header>
                        <DeatiledSubmit
                            handleStartDate={this.handleStartDate}
                        />
                        <div id="guestinfo">
                            <table id="result">
                                <thead>
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
                                        <td className="tableTD" > 4</td>
                                        <td className="tableTD" > 4</td>
                                        <td className="tableTD" > 2</td>
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

export default DetailedAvailability;
