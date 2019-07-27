import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style3.css";
import Header from "../../components/Header"
import Table from 'react-bootstrap/Table';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import moment from 'moment';

class Payment extends Component {
    state = {
        RoomInfo: [],
        InvoiceArray: [],
        invoice_id: "",
        paid: false,
        res_room_id: "",
        room_num: ""
    };

    componentDidMount() {
        if (localStorage && localStorage.getItem('invoice_id')) {
            const invoice_id = JSON.parse(localStorage.getItem('invoice_id'));
            this.setState({ paid: true }, () => {
                api.getInvoice(invoice_id)
                    .then(res => this.setState({ InvoiceArray: res }))
                    .catch(err => console.log(err))
            })
        } else if (localStorage && localStorage.getItem('res_room_id')) {
            const res_room_id = JSON.parse(localStorage.getItem('res_room_id'));
            const room_num = JSON.parse(localStorage.getItem('room_num'));
            this.setState({ res_room_id: res_room_id, room_num: room_num })
        }
    }

    handleSubmitPayment = event => {
        event.preventDefault();
        api.updateRoomCheckout(this.state.res_room_id, this.state.room_num)
            .then(res => this.setState({ paid: true, invoice_id: res[1].data }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xl={12}>
                        <Header>INVOICE</Header>
                    </Col>
                </Row>
                <div id="res">
                    <div id="res" style={{ paddingBottom: "10px" }}>
                        <Row>
                            <Table border="1">
                                <tbody>
                                    {this.state.InvoiceArray.map(invoice => (
                                        <ul key={invoice.res_room_id}>
                                            <tr>
                                                <th><strong>Room Number:</strong> {invoice.room_num}</th>
                                                <th colspan="2"><strong>Name:</strong> {invoice.last_name}, {invoice.first_name}</th>
                                                <th><strong>CC Number: </strong> {invoice.ccLastFour} </th>
                                                <th colSpan="2"><strong>Date: {moment(invoice.check_in_date).format('YYYY-MM-DD')} to {moment(invoice.check_out_date).format('YYYY-MM-DD')}</strong></th>
                                            </tr>
                                            <tr>
                                                <th><strong>Num Nights</strong></th>
                                                <th><strong>Rate</strong></th>
                                                <th><strong>Room Total</strong></th>
                                                <th><strong>County Tax</strong></th>
                                                <th><strong>City Tax</strong></th>
                                                <th><strong>State Tax</strong></th>
                                                <th><strong>Total Due</strong></th>
                                            </tr>
                                            <tr>
                                                <td>{invoice.num_days}</td>
                                                <td>${invoice.rate}</td>
                                                <td>${(parseInt(invoice.num_days) * parseFloat(invoice.rate)).toFixed(2)} </td>
                                                <td>${invoice.county_tax}</td>
                                                <td>${invoice.city_tax}</td>
                                                <td>${invoice.state_tax}</td>
                                                <td>${((parseInt(invoice.num_days) * parseFloat(invoice.rate)) + parseFloat(invoice.county_tax) + parseFloat(invoice.city_tax) + parseFloat(invoice.state_tax)).toFixed(2)}</td>

                                            </tr>
                                        </ul>
                                    ))}
                                </tbody>
                                <Row style={{ margin: "10px 0px 20px" }}>
                                    <Col xl={2}>
                                    </Col>
                                    <Col xl={2}>
                                        <strong>  </strong>
                                    </Col>
                                    <Col xl={2}>
                                        Credit Card <input type="radio" name="myCheck" checked />
                                    </Col>
                                    <Col xl={2}>
                                        Cash <input type="radio" name="myCheck" />
                                    </Col>
                                </Row>
                                <Row style={{ margin: "30px 0px 20px" }}>
                                    <Col xl={5}>
                                    </Col>
                                    <Col className="text-center">
                                        {this.state.paid ? <div><button className="btn btn-primary" disabled>Submit Payment</button><p className="small text-dark">Payment has been submitted</p></div> : <button onClick={() => this.handleSubmitPayment()}>Submit Payment</button>}
                                        <br />
                                        <Link className="btn btn-primary mt-1" to="/cashiering/billing">Back to Billing</Link>
                                    </Col>
                                </Row>


                            </Table>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

export default Payment;
