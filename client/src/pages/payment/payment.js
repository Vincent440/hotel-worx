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
                                            {this.state.InvoiceArray.map(invoice => (
                                                <tr key={invoice.res_room_id}>
                                                    <td>Room Total: ${invoice.room_total}</td>
                                                    <td>Tax: ${invoice.tax}</td>
                                                    <td>Total Due: ${(parseFloat(invoice.room_total)+parseFloat(invoice.tax)).toFixed(2)}</td>
                                                </tr>
                                            ))}
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
