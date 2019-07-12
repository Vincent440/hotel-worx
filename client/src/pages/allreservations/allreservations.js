import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header";
import SearchSubmit from "../../components/searchButton";
import DateRange from "../../components/dateRange/dateRange";
import { Container, Table } from 'react-bootstrap';
import api from '../../utils/api';
import moment from 'moment';
import Particles from "react-particles-js";

const particleOpt = { particles: { number: { value: 120, density: { enable: true, value_area: 1000 } } } };
class UpdateReservation extends Component {
    // Setting the initial values of this.state.username and this.state.password
    constructor(props) {
        super(props);
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);

    }

    state = {
        firstname: "",
        lastname: "",
        sdate: undefined,
        edate: undefined,
        confirmationNumber: undefined,
        resRooms: []
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
    handleFromChange(sdate) {
        // Change the from date and focus the "to" input field
        this.setState({ sdate });

    }
    handleToChange(edate) {
        this.setState({ edate }, this.showFromMonth);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });

    }

    componentDidMount() {
        this.makeAxiosCall();
    }

    makeAxiosCall = () => {
        const criteria = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            edate: moment(this.state.edate).format('YYYY-MM-DD'),
            sdate: moment(this.state.sdate).format('YYYY-MM-DD'),
            confirmationNumber: this.state.confirmationNumber
        }
        api.getReservations(criteria)
            .then(res => this.setState({ resRooms: res }))
            .catch(err => console.log(err));
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.makeAxiosCall();

    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <Container>
                <Particles params={particleOpt} id="particul" />

                <Row>
                    <Col sm={2}>
                        <InfoPart user={this.props.user} logout={this.props.logout} />
                    </Col>
                    <Col sm={10}>
                        <Row>
                            <Col xl={12}>
                                <Header>ALL RESERVATIONS</Header>
                            </Col>
                        </Row>
                        <div id="res" style={{ paddingBottom: "10px" }}>
                            <Row>
                                <Col xl={10}>
                                    <Row>
                                        <Col xl={1}>Arrival</Col>
                                        <Col xl={8}>
                                            <DateRange
                                                handleFromChange={this.handleFromChange}
                                                handleToChange={this.handleToChange}
                                                sdate={this.state.sdate}
                                                edate={this.state.edate}
                                            />
                                        </Col>
                                    </Row>

                                    <Row style={{ marginTop: "5px" }}>
                                        <Col xl={1}>Name:</Col>
                                        <Col xl={3}>
                                            <input
                                                type="text"
                                                placeholder="First Name"
                                                name="firstname"
                                                value={this.state.firstname}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                        <Col xl={3} style={{ paddingLeft: "67px" }}>Last Name:</Col>
                                        <Col xl={2}>
                                            <input
                                                type="text"
                                                placeholder="Last Name"
                                                name="lastname"
                                                value={this.state.lastname}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: "5px" }}>
                                        <Col xl={3}>Confirmation Number:</Col>
                                        <Col xl={1}>
                                            <input
                                                type="tel"
                                                placeholder="Confirmation Number"
                                                name="confirmationNumber"
                                                value={this.state.confirmationNumber}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>

                                    </Row>
                                </Col>


                                <Col xl={2} style={{ paddingTop: "25px", Left: "30px" }}>
                                    <Col xl={12}>
                                        <SearchSubmit handleFormSubmit={this.handleFormSubmit} />

                                    </Col>
                                </Col>
                            </Row>
                        </div>
                        <div id="res">

                            <Row style={{ paddingBottom: "20px" }}>
                                <Col xl={12}>
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <th>
                                                    Last Name
                                                    </th>
                                                <th>
                                                    First Name
                                                    </th>
                                                <th>
                                                    Arrival Date
                                             </th>
                                                <th>
                                                    Departure Date
                                             </th>
                                                <th>
                                                    Room Type
                                                    </th>
                                                <th>
                                                    Status
                                              </th>
                                            </tr>

                                            {this.state.resRooms.map(res => (
                                                <tr key={res.res_room_id}>
                                                    <td>{res.last_name}</td>
                                                    <td>{res.first_name}</td>
                                                    <td>{res.check_in_date}</td>
                                                    <td>{res.check_out_date}</td>
                                                    <td>{res.type}</td>
                                                    <td>
                                                        {res.active === 1 ? "Active" : "Cancelled"}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                </Row >
            </Container >
        )
    }
}

export default UpdateReservation;
