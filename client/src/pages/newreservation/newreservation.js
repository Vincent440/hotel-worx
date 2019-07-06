import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col } from 'react-grid-system';
import "./style.css";
import InfoPart from "../../components/infoPart";
import api from '../../utils/api';
import Header from "../../components/Header";
import DateRange from "../../components/dateRange/dateRange";
import { Container, Table } from 'react-bootstrap';
import ButtonSubmit from "../../components/submitButton";
import RegisterForm from "../../components/validation";
import moment from 'moment';

// const test_reservation = { 
//     "cust": ["0first_name", "1last_name", "2address", "3city", "4state", "5zip", "6email", "7phone", "8credit_card_num", "9cc_expiration", "10active"],
//     "reserve": ["0user_id", "1comments"],
//     "rooms": [["0room_type_id", "1check_in_date", "2check_out_date", "2adults", "3confirmation_code", "4comments"]]
// }

class ReserveNew extends Component {
    constructor(props) {
        super(props);
        this.handleFromChange=this.handleFromChange.bind(this);
        this.handleToChange=this.handleToChange.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleFormSubmit=this.handleFormSubmit.bind(this);
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
        adults: "",
        noOfRooms: "",
        roomtype: "",
        RoomTypes: [],
        creditCard: "",
        expirationDate: "",
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
            [e.target.name] : e.target.value,
        });

    }

      validateForm() {

        let fields = this.state.fields;
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
        if (!this.state.lastname ) {
            formIsValid = false;
            errors["lastname"] = "*Please enter your lastname.";
        }

        if (typeof this.state.lastname !== "undefined") {
            if (!this.state.lastname .match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["lastname"] = "*Please enter alphabet characters only.";
            }
        }

        if (!this.state.email ) {
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
    // handle any changes to the input fields
    handleInputChange = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        // console.log(event.target.value);
        const { name, value } = event.target;
        // Set the state for the appropriate input field
        this.setState({
            [name]: value
        });
    }
    componentDidMount() {
        api.getRoomTypes()
            .then(res => this.setState({ RoomTypes: res, roomtype: res[0].room_type_id }))
            .catch(err => console.log(err));
    }

    handleFormSubmit(e) {
        console.log(this);
        e.preventDefault();
        if (this.validateForm()) {
            // let fields = {};
            // fields["firstname"] = "";
            // fields["lastname"] = "";
            // fields["email"] = "";
            // fields["phone"] = "";
            // fields["password"] = "";
            // this.setState({ fields: fields });
            // alert("Form submitted");
            this.makeAxiosCall();

        }
    }
    makeAxiosCall = () => {
        api.createReservation(this.state)
            .then(res => this.setState({ reservationSuccess: true, newReservationId: res.data.reservation_id }))
            .catch(err => console.log(err));
    }
    
  



    render() {


        if (this.state.reservationSuccess) {
            return (
                <Redirect to={{
                    pathname: '/ResConfirmation',
                    state: { newReservationId: this.state.newReservationId }
                }} />
            )
        }

        return (
            <Container>
                <Row>
                    <Col sm={2}>
                        <InfoPart />
                    </Col>
                    <Col sm={10}>
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
                                                value={this.state.nights}
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
                                />

                            </Col>
                        </Row>

                        {/* 
                         <div id="guestinfo">
                            <Row>
                                <Col xl={10}>
                                    <Row>
                                        <Col xl={2}>
                                            First Name
                                        </Col>
                                        <Col xl={3}>
                                            <input
                                                type="text"
                                                placeholder="First Name"
                                                name="firstname"
                                                value={this.state.firstname}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                        <Col xl={2}>
                                            Last Name
                                        </Col>
                                        <Col xl={2}>
                                            <input
                                                type="text"
                                                placeholder="Last Name"
                                                name="lastname"
                                                value={this.state.lastname}
                                                onChange={this.handleInputChange}
                                            /></Col>
                                    </Row>
                                    <Row style={{ marginTop: "5px" }}>
                                        <Col xl={2}>
                                            Phone Number
                                        </Col>
                                        <Col xl={3}>
                                            <input
                                                type="tel"
                                                placeholder="Phone Number"
                                                name="phone"
                                                value={this.state.phone}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                        <Col xl={2}>
                                            Email Address
                                        </Col>
                                        <Col xl={2}>
                                            <input
                                                type="email"
                                                placeholder="Email Address"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.handleInputChange}
                                            /></Col>
                                    </Row>
                                    <Row style={{ marginTop: "5px" }}>
                                        <Col xl={2}>
                                            Address
                                        </Col>
                                        <Col xl={3}>
                                            <input
                                                type="text"
                                                placeholder="Adress"
                                                name="address"
                                                value={this.state.address}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>

                                        <Col xl={2}>
                                            <input
                                                type="text"
                                                placeholder="City"
                                                name="city"
                                                value={this.state.city}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                        <Col xl={2}>
                                            <input
                                                type="text"
                                                placeholder="State"
                                                name="state"
                                                value={this.state.state}
                                                onChange={this.handleInputChange}
                                            /></Col>
                                        <Col xl={1}>
                                            <input
                                                type="text"
                                                placeholder="ZipCode"
                                                name="zip"
                                                value={this.state.zip}
                                                onChange={this.handleInputChange}
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: "5px" }}>
                                        <Col xl={3}  style={{marginRight:"-85px", marginBottom:"10px"}}>
                                            Credit Card Number
                                        </Col>
                                        <Col xl={9}>
                                            <CreditCardInput   
                                                cardNumberInputProps={{ value: this.state.creditCard, onChange: this.handleCardNumberChange }}
                                                cardExpiryInputProps={{ value: this.state.expirationDate, onChange: this.handleCardExpiryChange }}
                                                cardCVCInputProps={{ value: this.state.cvc, onChange: this.handleCardCVCChange }}
                                                fieldClassName="input"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={2}>
                                            Comments
                                        </Col>
                                        <Col xl={10}>
                                        <input
                                                type="text"
                                                placeholder="Comment"
                                                name="comment"
                                                value={this.state.comment}
                                                onChange={this.handleInputChange}
                                                style={{backgroundColor:"#F0EAD6"}}
                                            />
                                            </Col>


                                    </Row>
                                </Col>
                            </Row>
                        </div> */}


                        {/* <ButtonSubmit handleSubmit={this.handleFormSubmit} /> */}
                        {/* <button type="submit" className="btn btn-primary" style={{ marginLeft: "480px" }} onClick={this.handleFormSubmit}>Submit</button> */}
                    </Col>
                </Row>
            </Container>

        )
    }
}


export default ReserveNew;