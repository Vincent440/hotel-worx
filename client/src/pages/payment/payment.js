import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "./style3.css";
import InfoPart from "../../components/infoPart";
import Header from "../../components/Header"
import { Container, Table } from 'react-bootstrap';
import api from '../../utils/api';

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
                                            <tr><td>
                                                {this.state.InvoiceArray.map(invoice => (
                                                    <ul key={invoice.res_room_id}>
                                                        <li>Num Nights: {invoice.num_days}</li>
                                                        <li>Rate: ${invoice.rate}</li>
                                                        <li>Room Total: ${(parseInt(invoice.num_days) * parseFloat(invoice.rate)).toFixed(2)}</li>
                                                        <li>County Tax: ${invoice.county_tax}</li>
                                                        <li>City Tax: ${invoice.city_tax}</li>
                                                        <li>State Tax: ${invoice.state_tax}</li>
                                                        <li>Total Due: ${((parseInt(invoice.num_days) * parseFloat(invoice.rate)) + parseFloat(invoice.county_tax) + parseFloat(invoice.city_tax) + parseFloat(invoice.state_tax)).toFixed(2)}</li>
                                                    </ul>
                                                ))}
                                            </td></tr>

                                        </tbody>
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
            </Container>
        )
    }
}

export default Payment;
