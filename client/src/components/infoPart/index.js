import React, { Component } from 'react';
import api from '../../utils/api';

import logo from "./solidcolor.png";
import { Card } from 'react-bootstrap';
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
            <Card id="infoCard">
                <Card.Img variant="top" src={logo} className="App-logo" id="logo" alt="logo" style={{ marginBottom: "180px" }} />
                <h5 className="card-title">User Name: {this.state.ReservationInfo}</h5>
                {/* <p className="card-text"> <Calendar /></p> */}
                <div className="card-text">
                    <ReactWeather
                        forecast="today"
                        apikey="96ccd12f1a9d49be80961318190107"
                        type="city"
                        city="Cleveland"
                        units='F' />
                        </div>
                <p style={{ textAlign: "center" }}><i className="fa fa-gear" style={{ fontSize: '28px' }} /></p>
            </Card>
        )
    }
};



export default InfoPart;