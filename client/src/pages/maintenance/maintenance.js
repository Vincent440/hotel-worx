import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import Header from "../../components/Header";
import api from '../../utils/api';
import moment from "moment";
import Table from 'react-bootstrap/Table';
import DateRange from "../../components/dateRangeOrg/dateRange";
// const today = moment().format("YYYY-MM-DD");

class Maintenance extends Component {
    constructor(props) {
        super(props);
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    state = {
        roomNumber: "",
        startDateRange: "",
        endDay: "",
        issue: "",
        newIssue: false,
        updateIssue: false,
        roomId: "",
        issueId: "",
        issuesArray: [],
        roomsArray: []
    };

    showFromMonth() {
        const { from, to } = this.state;
        if (!from) {
            return;
        }
        if (moment(to).diff(moment(from), 'months') < 2) {
            this.to.getDayPicker().showMonth(from);
        }
    }
    handleFromChange(startDateRange) {
        this.setState({ startDateRange });
    }
    handleToChange(endDay) {
        this.setState({ endDay }, this.showFromMonth);
    }
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    handleUpdate(i) {
        this.setState({ startDateRange: "", endDay: "" }, () => {
            this.setState({
                updateIssue: true,
                issueId: this.state.issuesArray[i].room_issue_id,
                roomNumber: this.state.issuesArray[i].room_num,
                startDateRange: moment(this.state.issuesArray[i].start_date).format("YYYY-MM-DD"),
                endDay: moment(this.state.issuesArray[i].end_date).format("YYYY-MM-DD"),
                issue: this.state.issuesArray[i].issue,
                roomId: this.state.issuesArray[i].room_id
            });
        });
    }
    updateFixed(id) {
        this.clearStateIssueInfo();
        api.updateRoomIssuesFixed(id)
            .then(() => this.makeAxiosCall())
            .catch(err => console.log(err));
    }
    clearStateIssueInfo() {
        this.setState({ newIssue: false, updateIssue: false, issueId: "", roomNumber: "", startDateRange: "", endDay: "", issue: "", roomId: "" });
    }
    handleCheckChange = event => {
        event.target.name === "newIssue" && this.setState({ newIssue: !this.state.newIssue, startDateRange: "", endDay: "" });
        event.target.name === "updateIssue" && this.clearStateIssueInfo();
    }
    makeAxiosCall = () => {
        api.getRoomIssues()
            .then(res => this.setState({ issuesArray: res }))
            .catch(err => console.log(err));
    }
    componentDidMount() {
        api.getRoomsIdNum()
            .then(res => this.setState({ roomsArray: res }))
            .catch(err => console.log(err));
        this.makeAxiosCall();
    }
    handleFormSubmit = event => {
        event.preventDefault();
        let values = [this.state.issue, this.props.user.user_id, moment(this.state.startDateRange).format("YYYY-MM-DD"), moment(this.state.endDay).format("YYYY-MM-DD")];
        if (this.state.newIssue) {
            let matchingRoom = this.state.roomsArray.filter(room => room.room_num === this.state.roomNumber);
            if (matchingRoom.length === 1) {
                values.unshift(matchingRoom[0].room_id);
                api.createRoomIssue(values)
                    .then(() => this.makeAxiosCall())
                    .catch(err => console.log(err))
                    .then(() => this.clearStateIssueInfo());
            }
        } else if (this.state.updateIssue) {
            values.unshift(this.state.roomId);
            api.updateRoomIssues(this.state.issueId, values)
                .then(() => this.makeAxiosCall())
                .catch(err => console.log(err))
                .then(() => this.clearStateIssueInfo());
        }
    }

    render() {
        return (
    <div>
        <Row>
            <Col xl={12}>
                <Header>MAINTENANCE</Header>
            </Col>
        </Row>
        <div id="res" style={{ paddingBottom: "10px" }}>
            <Row>
                <Col xl={3}>
                    <b id="questionPart">
                        {this.state.updateIssue ? "Update Selected Issue" : "Add New Work Order"}
                    </b>
                </Col>
                <Col xl={5}>
                    <input
                        type="checkbox"
                        name={this.state.updateIssue ? "updateIssue" : "newIssue"}
                        checked={this.state.updateIssue ? this.state.updateIssue : this.state.newIssue}
                        onChange={this.handleCheckChange}
                    />
                </Col>
            </Row>
            <hr />
            {(this.state.newIssue || this.state.updateIssue) &&
                <Row>
                    <div id="workOrder">
                        <Col xl={12}>
                            <Row>
                                <Col xl={2}>Room Number</Col>
                                <Col sm={2}>
                                    <input style={{ width: "150px" }}
                                        onChange={this.handleChange}
                                        name="roomNumber"
                                        placeholder="Room Number"
                                        value={this.state.roomNumber}
                                    />
                                </Col>
                            </Row>
                            <Row id="fourthRow">
                                <Col xl={2}>Date</Col>
                                <Col xl={6}>
                                    <div>
                                        <DateRange
                                        
                                            handleFromChange={this.handleFromChange}
                                            handleToChange={this.handleToChange}
                                            from={this.state.startDateRange}
                                            to={this.state.endDay}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row id="maintRow">
                                <Col xl={2}>Problem</Col>
                                <Col xl={5}>
                                    <textarea
                                        type="text"
                                        name="issue"
                                        value={this.state.issue}
                                        onChange={this.handleChange}
                                        style={{ backgroundColor: "#F0EAD6" }}
                                    ></textarea>
                                </Col>
                                <Col xl={2}>
                                </Col>
                                <Col xl={2}>
                                    <button type="button" className="btn btn-success" onClick={this.handleFormSubmit}>Submit</button>
                                </Col>
                            </Row>
                        </Col>
                    </div>
                </Row>
            }
        </div>
        <div id="res">
            <Row style={{ paddingTop: "5px", paddingBottom: "5px" }}>
                <Col xl={12}>
                    <Table>
                        <tbody>
                            <tr>
                                <th>Room Number</th>
                                <th>Room Type</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Problem</th>
                                <th></th>
                                <th></th>
                            </tr>
                            {this.state.issuesArray.map((issue, i) => (
                                <tr key={issue.room_issue_id}>
                                    <td>{issue.room_num}</td>
                                    <td>{issue.type}</td>
                                    <td>{moment(issue.start_date).format("YYYY-MM-DD")}</td>
                                    <td>{moment(issue.end_date).format("YYYY-MM-DD")}</td>
                                    <td>{issue.issue}</td>
                                    <td><button type="button" className="btn btn-success" name="issueId" onClick={() => this.handleUpdate(i)}>Update</button>
                                    </td>
                                    <td><button type="button" className="btn btn-success" onClick={() => this.updateFixed(issue.room_issue_id)}>Fixed</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row >
        </div>
    </div>
    )
    }
}

export default Maintenance;