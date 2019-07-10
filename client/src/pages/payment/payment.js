import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style3.css";
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header"
import { Container, Table } from 'react-bootstrap';
import api from '../../utils/api';
import { Link } from 'react-router-dom';

class Payment extends Component {

    state = {
        RoomInfo: [],
        InvoiceArray: [],
        invoice_id: ""
    };

    componentDidMount() {
        let invoice_id = "";
        if (localStorage && localStorage.getItem('invoice_id')) {
            invoice_id = JSON.parse(localStorage.getItem('invoice_id'));
        }
        this.setState({ invoice_id: invoice_id }, () => {
            api.getInvoice(this.state.invoice_id)
                .then(res => this.setState({ InvoiceArray: res }))
                .catch(err => console.log(err))
        });
    }

    render() {

        return (
            <Container>
                <Row>
                    <Col sm={2}>
                        <InfoPart />
                    </Col>
                    <Col sm={10}>
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
                                                        <th colspan="2"><strong>Room Number:</strong> {invoice.room_num}</th>
                                                        <th colspan="2"><strong>Name:</strong> {invoice.last_name}, {invoice.first_name}</th>
                                                        <th><strong>CC Number: </strong> {invoice.ccLastFour} </th>
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
                                                Credit Card <input type="radio" name="myCheck" checked/>
                                            </Col>
                                            <Col xl={2}>
                                                Cash <input type="radio" name="myCheck" />
                                            </Col>
                                        </Row>
                                        <Row style={{ margin: "30px 0px 20px" }}>
                                            <Col xl={5}>
                                            </Col>
                                            <Col>
                                                <Link className="btn navbar-right btn-primary" to="/cashiering/billing" type="submit">Submit Payment</Link>
                                            </Col>
                                        </Row>


                                    </Table>
                                </Row>

                                {/* <button type="button" class="btn btn-primary" style={{ marginLeft: "350px", marginTop: "10px" }}>Post</button>
                                    <button type="button" class="btn btn-danger" style={{ marginTop: "10px" }}>Payment</button>
                                    <button type="button" class="btn btn-danger" style={{ marginTop: "10px" }}>Check Out</button>
                                    <button type="button" class="btn btn-primary" style={{ marginTop: "10px", marginLeft: "5px" }}>Close</button> */}
                            </div>
                        </div>
                    </Col>
                </Row >
            </Container >
        )
    }
}

export default Payment;
