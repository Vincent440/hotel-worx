import React, { Component } from 'react';
import api from '../../utils/api';
import Calendar from "../calendar";
import { Row, Col } from 'react-grid-system';
import logo from "./solidcolor.png";
import { Card, ListGroup } from 'react-bootstrap';
import "./style.css";
import ReactWeather from 'react-open-weather';
//Optional include of the default css styles 
import 'react-open-weather/lib/css/ReactWeather.css';

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
                <Card id="infoCard">
                    <Card.Img variant="top" src={logo} className="App-logo" id="logo" alt="logo" style={{ marginBottom: "180px" }} />
                    <h5 className="card-title">User Name: {this.state.ReservationInfo}</h5>
                    {/* <p className="card-text"> <Calendar /></p> */}
                    <p className="card-text"> 
                    <ReactWeather 
                        forecast="today"
                        apikey="96ccd12f1a9d49be80961318190107"
                        type="city"
                        city="Cleveland"
                        units='F'/></p>
                    <p style={{ textAlign: "center" }}><i className="fa fa-gear" style={{ fontSize: '28px' }} /></p>
                </Card>

            </Col>
        )
    }
};



export default InfoPart;