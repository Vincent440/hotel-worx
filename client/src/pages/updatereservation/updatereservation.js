import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import api from '../../utils/api';
import Header from "../../components/Header";
import DateRange from "../../components/dateRange/dateRange";
import RegisterForm from "../../components/validationUpdateRes";
import moment from 'moment';

class ReserveUpdate extends Component {
    constructor(props) {
        super(props);
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleCancelSubmit = this.handleCancelSubmit.bind(this);
    }

    state = {
        customerId: "",
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
        numRooms: 1,
        roomNumber: "",
        roomtype: "",
        RoomTypes: [],
        creditCard: "",
        expirationDate: "",
        confirmationNumber: "",
        updateSuccess: false,
        reservationId: "",
        resRoomId: "",
        comments: "",
        rate: "",
        cancelSuccess: false,
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

    handleArrivalDateChange() {
        this.setState({ arrivaldate: "" });
    }

    handleDeparturedateDateChange() {
        this.setState({ departuredate: "" });
    }

    handleFromChange(arrivaldate) {
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
        let reservation_id = "";
        if (localStorage && localStorage.getItem('reservation_id')) {
            reservation_id = JSON.parse(localStorage.getItem('reservation_id'));
            this.setState({ reservationId: reservation_id });
            api.getRoomTypes()
                .then(res => this.setState({ RoomTypes: res, roomtype: res[0].room_type_id }))
                .catch(err => console.log(err));
            api.getReservation(reservation_id)
                .then(res => this.setState({ customerId: res.resCust[0].customer_id, firstname: res.resCust[0].first_name, lastname: res.resCust[0].last_name, address: res.resCust[0].address, city: res.resCust[0].city, state: res.resCust[0].state, zip: res.resCust[0].zip, email: res.resCust[0].email, phone: res.resCust[0].phone, creditCard: res.resCust[0].credit_card_num, expirationDate: res.resCust[0].cc_expiration, resRoomId: res.resRooms[0].res_room_id, departuredate: moment(res.resRooms[0].check_out_date).format('YYYY-MM-DD'), arrivaldate: moment(res.resRooms[0].check_in_date).format('YYYY-MM-DD'), adults: res.resRooms[0].adults, roomtype: res.resRooms[0].room_type_id, rate: res.resRooms[0].rate, confirmationNumber: res.resRooms[0].confirmation_code, roomNumber: res.resRooms[0].room_num, comments: res.resRooms[0].comments }))
                .catch(err => console.log(err));
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        if (this.validateForm()) {
            this.makeAxiosCall();
        }
    }

    handleCancelSubmit(e) {
        e.preventDefault();
        api.cancelReservation(this.state.reservationId)
                .then(() => this.setState({ cancelSuccess: true, updateSuccess: false }))
                .catch(err => console.log(err));
    }

    makeAxiosCall = () => {
        const data = {
            reservation_id: this.state.reservationId,
            customerId: this.state.customerId,
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
            resRoomId: this.state.resRoomId,
            comments: this.state.comments,
            rate: this.state.rate
        }
        api.updateReservation(data)
            .then(() => this.setState({ updateSuccess: true, cancelSuccess: false }))
            .catch(err => console.log(err));
    }

    render() {

        return (
            <div>
                <Row>
                    <Col xl={12}>
                        <Header>UPDATE RESERVATION</Header>
                    </Col>
                </Row>
                <Row>
                    <Col xl={12}>
                        <div id="res" style={{ paddingBottom: "10px" }}>
                            <Row style={{ paddingBottom: "5px" }}>
                                <Col xl={1}>Confirmation Number</Col>
                                <Col xl={3}>
                                    <input
                                        type="text"
                                        placeholder="Confirmation Number"
                                        name="confirmationNumber"
                                        value={this.state.confirmationNumber}
                                        onChange={this.handleInputChange}
                                        disabled
                                    />
                                </Col>
                                <Col xl={2}>Room Number</Col>
                                <Col xl={2}>
                                    <input
                                        type="tel"
                                        placeholder="Room Number"
                                        name="roomNumber"
                                        value={this.state.roomNumber}
                                        onChange={this.handleInputChange}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ paddingBottom: "5px" }}>
                                <Col xl={1}>Arrival</Col>
                                <Col xl={7}>
                                    <div>
                                        <DateRange
                                            handleArrivalDateChange={this.handleArrivalDateChange}
                                            handleDeparturedateDateChange={this.handleDeparturedateDateChange}
                                            handleFromChange={this.handleFromChange}
                                            handleToChange={this.handleToChange}
                                            from={this.state.arrivaldate}
                                            to={this.state.departuredate}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{ paddingBottom: "4px" }}>
                                <Col xl={1}>Nights</Col>
                                <Col xl={3}>
                                    <input
                                        type="number"
                                        placeholder="Number of Nights"
                                        name="nights"
                                        value={this.state.departuredate && (Math.round((this.state.departuredate - this.state.arrivaldate) / (1000 * 60 * 60 * 24)))}
                                        onChange={this.handleInputChange}
                                    />
                                </Col>
                                <Col xl={2}>No of Rooms</Col>
                                <Col xl={2}>
                                    <input
                                        type="number"
                                        placeholder="Number of Rooms"
                                        name="numRooms"
                                        value={this.state.numRooms}
                                        onChange={this.handleInputChange}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={1}>Adults</Col>
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
                                <Col xl={2}>Room Type</Col>
                                <Col xl={2}>
                                    <select name="roomtype" value={this.state.roomtype} onChange={this.handleInputChange}>
                                        {this.state.RoomTypes.map(type => (
                                            <option key={type.room_type_id} value={type.room_type_id}>{type.type} - {type.rate}</option>
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
                            cvc={this.state.cvc}
                            errors={this.state.errors}
                            comments={this.state.comments}
                            updateSuccess={this.state.updateSuccess}
                            cancelSuccess={this.state.cancelSuccess}
                            handleCancelSubmit={this.handleCancelSubmit}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ReserveUpdate;