import React from 'react';
import CreditCardInput from 'react-credit-card-input';
import { Row, Col } from 'react-grid-system';


class RegisterForm extends React.Component {

    render() {
        return (
            <div>
                <div id="res">
                    <Row>
                        <Col xl={10}>
                            <form method="post" name="userRegistrationForm" onSubmit={this.props.handleFormSubmit} >
                                <Row style={{ paddingBottom: "2px" }}>
                                    <Col xl={2}><label>First Name</label></Col>
                                    <Col xl={3}>
                                        <input type="text" name="firstname" value={this.props.firstname} onChange={this.props.handleChange} />
                                        <div className="errorMsg">{this.props.errors.firstname}</div>
                                    </Col>
                                    <Col xl={2}><label>Last Name</label></Col>
                                    <Col xl={2}>
                                        <input type="text" name="lastname" value={this.props.lastname} onChange={this.props.handleChange} />
                                        <div className="errorMsg">{this.props.errors.lastname}</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={2}>Phone Number</Col>
                                    <Col xl={3}>
                                        <input type="tel" name="phone" placeholder="888 888 8888" pattern='[0-9]{3} [0-9]{3} [0-9]{4}' value={this.props.phone} onChange={this.props.handleChange} required />

                                        <div className="errorMsg">{this.props.errors.phone}</div>
                                    </Col>
                                    <Col xl={2}>Email Address</Col>
                                    <Col xl={2}>
                                        <input type="text" name="email" value={this.props.email} onChange={this.props.handleChange} />
                                        <div className="errorMsg">{this.props.errors.email}</div>
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "5px" }}>
                                    <Col xl={2}>Address</Col>
                                    <Col xl={3}>
                                        <input
                                            type="text"
                                            placeholder="Adress"
                                            name="address"
                                            value={this.props.address}
                                            onChange={this.props.handleChange}
                                        />
                                    </Col>

                                    <Col xl={2}>
                                        <input
                                            type="text"
                                            placeholder="City"
                                            name="city"
                                            value={this.props.city}
                                            onChange={this.props.handleChange}
                                        />
                                    </Col>
                                    <Col xl={2}>
                                        <input
                                            type="text"
                                            placeholder="State"
                                            name="state"
                                            value={this.props.state}
                                            onChange={this.props.handleChange}
                                        /></Col>
                                    <Col xl={1}>
                                        <input
                                            type="text"
                                            placeholder="ZipCode"
                                            name="zip"
                                            value={this.props.zip}
                                            onChange={this.props.handleChange}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: "5px" }}>
                                    <Col xl={3} style={{ marginRight: "-85px", marginBottom: "10px" }}>
                                        Credit Card Number
                                        </Col>
                                    <Col xl={9}>
                                        <CreditCardInput
                                            cardNumberInputProps={{ name: 'creditCard', value: this.props.creditCard, onChange: this.props.handleChange }}
                                            cardExpiryInputProps={{ name: 'expirationDate', value: this.props.expirationDate, onChange: this.props.handleChange }}
                                            cardCVCInputProps={{ name: 'cvc', value: this.props.cvc, onChange: this.handleChange }}
                                            fieldClassName="input"
                                        />
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: "20px" }}>
                                    <Col xl={2}>Comments</Col>
                                    <Col xl={10}>
                                        <input
                                            type="text"
                                            placeholder="Comments"
                                            name="comments"
                                            value={this.props.comments}
                                            onChange={this.props.handleChange}
                                            style={{ backgroundColor: "#F0EAD6" }}
                                        />
                                    </Col>
                                </Row>
                            </form>
                        </Col>
                    </Row>

                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary m-2" onClick={this.props.handleCancelSubmit}>Cancel Reservation</button>
                    <button type="submit" className="btn btn-primary m-2" onClick={this.props.handleFormSubmit}>Submit</button>
                    <br />
                    <span className="text-light">{this.props.updateSuccess && "Reservation was successfully updated!"}</span>
                    <span className="text-light">{this.props.cancelSuccess && "Reservation has been cancelled!"}</span>
                </div>
            </div>

        );
    }


}


export default RegisterForm;