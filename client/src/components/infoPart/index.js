import React, { Component } from 'react';
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
                <button className="btn btn-block btn-default" style={{width:"50px",paddingLeft:"7px", paddingTop:"15px", marginTop:"30px", marginLeft:"70px"}}><i className="fa fa-gear" style={{fontSize:"28px", color:"white" }}></i></button>
                <button onClick={this.props.setAppLogout} className="btn btn-block btn-default" style={{width:"50px", textAlign:"center", paddingLeft:"7px", paddingTop:"5px" , marginTop:"5px", marginLeft:"70px"}}><i className="fa fa-sign-out-alt" style={{fontSize:"28px", color:"white" }}></i></button>
            </Card>
        )
    }
};

export default InfoPart;