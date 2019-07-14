import React, { Component } from 'react';
import logo from "./solidcolor.png";
import hotelLogo from "./hotel.png";
import { Card } from 'react-bootstrap';
import "./style.css";
import ReactWeather from 'react-open-weather';
//Optional include of the default css styles 
import 'react-open-weather/lib/css/ReactWeather.css';
import api from '../../utils/api';

class InfoPart extends Component {
    state = {
        hotelInfo: []
    };

    makeAxiosCall = () => {
        api.getHotelInfo(1)
            .then(res => this.setState({ hotelInfo: res }))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.makeAxiosCall();
    }

    render() {
        return (
            <Card id="infoCard">
                {this.state.hotelInfo.map(info => (
                    <div key={InfoPart.hotel_info_id} style={{ marginBottom: "20px" }}>
                        <div className="text-center"><img src={hotelLogo} width="100" height="auto" /></div>
                        <div className="text-center">{info.hotel_name}</div>
                        <div className="small faded">{info.address}</div>
                        <div className="small faded">{info.city}, {info.state} {info.zip}</div>
                        <div className="small faded">{info.email}</div>
                        <div className="text-center">{info.phone}</div>
                    </div>
                ))}
                <Card.Img variant="top" src={logo} className="App-logo" id="logo" alt="logo" style={{ marginBottom: "20px" }} />
                <h5 className="card-title">User Name: {this.props.user.username}</h5>
                {/* <p className="card-text"> <Calendar /></p> */}
                <div className="card-text">
                    <ReactWeather
                        forecast="today"
                        apikey="96ccd12f1a9d49be80961318190107"
                        type="city"
                        city="Cleveland"
                        units='F' />
                </div>
                <button className="btn btn-block btn-default" style={{width:"50px",paddingLeft:"7px", paddingTop:"15px", marginTop:"40px", marginLeft:"70px"}}><i className="fa fa-gear" style={{fontSize:"28px", color:"white" }}></i></button>
                <button onClick={this.props.logout} className="btn btn-block btn-default" style={{width:"50px", textAlign:"center", paddingLeft:"7px", paddingTop:"5px" , marginTop:"5px", marginLeft:"70px"}}><i className="fa fa-sign-out-alt" style={{fontSize:"28px", color:"white" }}></i></button>
            </Card>
        )
    }
};

export default InfoPart;