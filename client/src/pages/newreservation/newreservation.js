import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import api from '../../utils/api';
import Header from "../../components/Header";
import DateRange from "../../components/dateRange/dateRange";
import { Container } from 'react-bootstrap';
import RegisterForm from "../../components/validation";
import moment from 'moment';
import Particles from "react-particles-js";

const particleOpt = { particles: { number: { value: 120, density: { enable: true, value_area: 1000 } } } };

class ReserveNew extends Component {
    constructor(props) {
        super(props);
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    state = {
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        arrivaldate: "",
        departuredate: "",
        nights: "",
        adults: 1,
        noOfRooms: "",
        RoomTypes: [],
        roomtype: undefined,
        rate: undefined,
        creditCard: "",
        expirationDate: "",
        res_comments: "",
        room_comments: "",
        reservationSuccess: false,
        newReservationId: "",
        errors: {}
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

    handleFromChange(arrivaldate) {
        // Change the from date and focus the "to" input field
        this.setState({ arrivaldate });

    }

    handleToChange(departuredate) {
        this.setState({ departuredate }, this.showFromMonth);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    validateForm() {

        let errors = {};
        let formIsValid = true;

        if (!this.state.firstname) {
            formIsValid = false;
            errors["firstname"] = "*Please enter your firstname.";
        }

        if (typeof this.state.firstname !== "undefined") {
            if (!this.state.firstname.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["firstname"] = "*Please enter alphabet characters only.";
            }
        }
        if (!this.state.lastname) {
            formIsValid = false;
            errors["lastname"] = "*Please enter your lastname.";
        }

        if (typeof this.state.lastname !== "undefined") {
            if (!this.state.lastname.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["lastname"] = "*Please enter alphabet characters only.";
            }
        }

        if (!this.state.email) {
            formIsValid = false;
            errors["email"] = "*Please enter your email-ID.";
        }

        if (typeof this.state.email !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.email)) {
                formIsValid = false;
                errors["email"] = "*Please enter valid email-ID.";
            }
        }

        if (!this.state.phone) {
            formIsValid = false;
            errors["phone"] = "*Please enter your mobile no.";
        }

        if (typeof this.state.phone !== "undefined") {
            if (!this.state.phone.match(/^[0-9]{10}$/)) {
                formIsValid = false;
                errors["phone"] = "*Please enter valid mobile no.";
            }
        }
        this.setState({
            errors: errors
        });
        return formIsValid;
    }
    handleInputChange = event => {
        if (event.target.name === "roomtype") {
            const roomKey = parseInt(event.target.value) - 1;
            this.setState({ rate: this.state.RoomTypes[roomKey].rate });
        }
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    componentDidMount() {
        api.getRoomTypes()
            .then(res => this.setState({ RoomTypes: res, roomtype: res[0].room_type_id, rate: res[0].rate }))
            .catch(err => console.log(err));
    }
    handleFormSubmit(e) {
        e.preventDefault();
        if (this.validateForm()) {
            this.makeAxiosCall();

        }
    }
    makeAxiosCall = () => {
        const data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            email: this.state.email,
            phone: this.state.phone,
            creditCard: this.state.creditCard,
            expirationDate: this.state.expirationDate,
            departuredate: moment(this.state.departuredate).format('YYYY-MM-DD'),
            arrivaldate: moment(this.state.arrivaldate).format('YYYY-MM-DD'),
            adults: this.state.adults,
            roomtype: this.state.roomtype,
            rate: this.state.rate,
            comments: this.state.room_comments
        }
        api.createReservation(data)
            .then(res => this.setState({ reservationSuccess: true, newReservationId: res.data.reservation_id }))
            .catch(err => console.log(err));
    }

    render() {

        if (this.state.reservationSuccess) {
            localStorage.setItem('reservation_id', this.state.newReservationId);
            return (
                <Redirect to={{
                    pathname: '/reserve/testreservation'
                }} />
            )
        }

        return (
            <Container>
                <Particles params={particleOpt} id="particul" />
                <Row>
                <Col xs={6} sm={4} md={3} lg={3} xl={2}>
                        <InfoPart user={this.props.user} logout={this.props.logout} />
                    </Col>
                    <Col xs={6} sm={8}md={9} lg={9} xl={10}>
                        <Row>
                            <Col xl={12}>
                                <Header>NEW RESERVATION</Header>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={12}>

                                <div id="res" style={{ paddingBottom: "10px" }}>
                                    <Row style={{ paddingBottom: "5px" }}>

                                        <Col xl={1}>
                                            Arrival
                                        </Col>
                                        <Col xl={7}>
                                            <div>
                                                <DateRange
                                                    handleFromChange={this.handleFromChange}
                                                    handleToChange={this.handleToChange}
                                                    from={this.state.arrivaldate}
                                                    to={this.state.departuredate}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingBottom: "4px" }}>
                                        <Col xl={1}>
                                            Nights
                                        </Col>
                                        <Col xl={3}>
                                            <input
                                                id=""
                                                type="number"
                                                placeholder="Number of Nights"
                                                name="nights"
                                                value={this.state.departuredate && Math.round((this.state.departuredate - this.state.arrivaldate) / (1000 * 60 * 60 * 24))}

                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                        <Col xl={2}>
                                            No of Rooms
                                        </Col>
                                        <Col xl={2}>
                                            <input
                                                type="number"
                                                placeholder="Number of Rooms"
                                                name="roomsnumber"
                                                value={this.state.roomsnumber}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col xl={1}>
                                            Adults
                                        </Col>
                                        <Col xl={3}>
                                            <input
                                                id=""
                                                type="number"
                                                name="adults"
                                                placeholder="Adults"
                                                value={this.state.adults}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>

                                        <Col xl={2}>
                                            Room Type:
                                        </Col>
                                        <Col xl={2}>
                                            <select name="roomtype" onChange={this.handleInputChange}>
                                                {this.state.RoomTypes.map(type => (
                                                    <option key={type.room_type_id}  value={type.room_type_id}>{type.type} - {type.rate}</option>
                                                ))}
                                            </select>

                                        </Col>
                                    </Row>
                                </div>

                                <RegisterForm
                                    handleFormSubmit={this.handleFormSubmit}
                                    handleChange={this.handleChange}
                                    firstname={this.state.firstname}
                                    lastname={this.state.lastname}
                                    phone={this.state.phone}
                                    email={this.state.email}
                                    address={this.state.address}
                                    city={this.state.city}
                                    state={this.state.state}
                                    zip={this.state.zip}
                                    creditCard={this.state.creditCard}
                                    expirationDate={this.state.expirationDate}
                                    comments={this.state.room_comments}
                                    cvc={this.state.cvc}
                                    errors={this.state.errors}
                                />

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default ReserveNew;