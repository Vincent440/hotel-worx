import React from 'react';
import CreditCardInput from 'react-credit-card-input';
import { Row, Col } from 'react-grid-system';


class RegisterForm extends React.Component {

    componentDidMount = () => {
        setTimeout(() => {
            console.log(this.state)
        }, 5000 )
    }
    render() {
        return (
            <div>
                <div id="guestinfo">
                    <Row>
                        <Col xl={10}>

                            <form method="post" name="userRegistrationForm" onSubmit={this.props.handleFormSubmit} >
                                <Row>
                                    <Col xl={2}>
                                        <label>First Name</label>
                                    </Col>
                                    <Col xl={3}>
                                        <input type="text" name="firstname" value={this.props.firstname} onChange={this.props.handleChange} />
                                        <div className="errorMsg">{this.props.errors.firstname}</div>
                                    </Col>
                                    <Col xl={2}>
                                        <label>Last Name</label>
                                    </Col>
                                    <Col xl={2}>
                                        <input type="text" name="lastname" value={this.props.lastname} onChange={this.props.handleChange} />
                                        <div className="errorMsg">{this.props.errors.lastname}</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={2}>
                                        Phone Number
                                </Col>
                                    <Col xl={3}>
                                        <input type="text" name="phone" value={this.props.phone} onChange={this.props.handleChange} />
                                        <div className="errorMsg">{this.props.errors.phone}</div>
                                    </Col>
                                    <Col xl={2}>
                                        Email Address
                                </Col>
                                    <Col xl={2}>
                                        <input type="text" name="email" value={this.props.email} onChange={this.props.handleChange} />
                                        <div className="errorMsg">{this.props.errors.email}</div>
                                    </Col>
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
                                            cardNumberInputProps={{ name: 'creditCard', value: this.creditCard, onChange: this.props.handleChange }}
                                            cardExpiryInputProps={{ name:'expirationDate', value: this.expirationDate, onChange: this.props.handleChange }}
                                            cardCVCInputProps={{ name:'cvc'  , value: this.cvc, onChange: this.handleChange }}
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
                                            value={this.props.comment}
                                            onChange={this.props.handleChange}
                                            style={{ backgroundColor: "#F0EAD6" }}
                                        />
                                    </Col>


                                </Row>
                            </form>
                        </Col>
                    </Row>

                </div>
                <button type="submit" className="btn btn-primary" style={{ marginLeft: "480px" }} onClick={this.props.handleFormSubmit}>Submit</button>
            </div>

        );
    }


}


export default RegisterForm;