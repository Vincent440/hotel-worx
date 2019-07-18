import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header";
import api from '../../utils/api';
import moment from "moment";
import { Container, Table } from 'react-bootstrap';
import Particles from "react-particles-js";
import DateRange from "../../components/dateRangeOrg/dateRange";


const particleOpt = { particles: { number: { value: 120, density: { enable: true, value_area: 1000 } } } };
const today = moment().format("YYYY-MM-DD");

class Maintenance extends Component {
    constructor(props) {
        super(props);
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    state = {
        startDateRange: today,
        endDay: "",
        newIssue: false,
        issue: "",
        roomNumber: "",
        issuesArray: []
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

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleCheckChange = event => {
        event.target.name === "newIssue" && this.setState({ newIssue: !this.state.newIssue });
    }

    makeAxiosCall = () => {

    }

    componentDidMount() {
        api.getRoomIssues()
            .then(res => this.setState({ issuesArray: res }))
            .catch(err => console.log(err));
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.makeAxiosCall();
    }

    render() {
        return (
            <Container>
                <Particles params={particleOpt} id="particul" />

                <Row>
                    <Col xs={6} sm={4} md={3} lg={3} xl={2}>
                        <InfoPart user={this.props.user} logout={this.props.logout} />
                    </Col>
                    <Col xs={6} sm={8} md={9} lg={9} xl={10}>
                        <Row>
                            <Col xl={12}>
                                <Header>MAINTENANCE</Header>
                            </Col>
                        </Row>
                        <div id="res" style={{ paddingBottom: "10px" }}>
                            <Row>
                                <Col xl={3}>
                                </Col>
                                <Col xl={2}>
                                    <bold>Add new work order</bold>
                                </Col>
                                <Col xl={6}>
                                    <input
                                        type="checkbox"
                                        name="newIssue"
                                        checked={this.state.newIssue}
                                        onChange={this.handleCheckChange}
                                    />
                                </Col>
                            </Row>
                            <hr />
                            {this.state.newIssue &&
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
                                                <Col xl={1}>Date</Col>
                                                <Col xl={7}>
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
                                                        id="problemInput"
                                                        type="text"
                                                        name="comment"
                                                        value={this.props.issue}
                                                        onChange={this.props.handleChange}
                                                        style={{ backgroundColor: "#F0EAD6" }}
                                                    />
                                                </Col>
                                                <Col xl={2}>
                                                </Col>
                                                <Col xl={2}>
                                                    <button type="button" className="btn btn-success">Submit</button>
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
                                            {this.state.issuesArray.map(issue => (
                                                <tr key={issue.room_issue_id}>
                                                    <td>{issue.room_num}</td>
                                                    <td>{issue.type}</td>
                                                    <td>{moment(issue.start_date).format("YYYY-MM-DD")}</td>
                                                    <td>{moment(issue.end_date).format("YYYY-MM-DD")}</td>
                                                    <td>{issue.issue}</td>
                                                    <td><button type="button" className="btn btn-success">Update</button>
                                                    </td>
                                                    <td><button type="button" className="btn btn-success">Fixed</button>
                                                    </td>
                                                </tr>
                                            ))}


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

export default Maintenance;
