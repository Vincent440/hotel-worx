import React, { Component } from 'react';
// import React, { Component, useEffect, useRef } from 'react';
import "./style.css";
// import { TweenMax, Linear } from "gsap";
// import logo from './solidcolor.png';
import Login from "../components/login/login";
import api from '../utils/api';



class Home extends Component {
    state = {
        username: "",
        password: ""
    };

    // logoElement = useRef(null);
    // useEffect = (() => {
    //     TweenMax.to(
    //         this.logoElement,
    //         1,
    //         {
    //             repeat: 0,
    //             rotation: 360,
    //             ease: Linear.easeNone
    //         }
    //     )
    // }, []);

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleLoginButton = event => {
        event.preventDefault();
        api.sendLogin()
            .then(res => {
                console.log(res.data.user);
            })
            .catch(err => console.log(err))
    };

    render() {
        return (
            <div>
                {/* <img src={logo} ref={element => { this.logoElement = element }} className="App-logo" id="logo" alt="logo" /> */}
                <Login username={this.state.username} password={this.state.password} validateForm={this.validateForm} handleChange={this.handleChange} handleLoginButton={this.handleLoginButton} />
            </div>
        );
    }
}

export default Home;