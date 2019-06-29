import React, { Component } from 'react';
import api from '../../utils/api';
import Calendar from "../calendar";
import { Row, Col } from 'react-grid-system';
import logo from "./solidcolor.png";
import { Card, ListGroup } from 'react-bootstrap';
import "./style.css";

class InfoPart extends Component {

    state = {
        ReservationInfo: "",

    };
    componentDidMount() {
        api.getReservation()
            .then(res => this.setState({ ReservationInfo: res.resCust.result[0] }))
            .catch(err => console.log(err));
    }
    render() {
        return (
            <Col sm={2}>
                <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.725)', height: "580px" }}>
                    <Card.Img variant="top" src={logo} className="App-logo" id="logo" alt="logo" style={{marginBottom:"200px"}}/>
                    <h5 class="card-title">User Name: {this.state.ReservationInfo}</h5>
                    <p class="card-text"> <Calendar /></p>
                    <p class="card-text"><h5>Weather</h5></p>
                    <p class="card-text" style={{ textAlign:"center"}}><i className="fa fa-gear" style={{ fontSize: '28px'}} /></p>
                </Card>

            </Col>
        )
    }
};



export default InfoPart;