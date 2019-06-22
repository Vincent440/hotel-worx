import React, { Component } from 'react';
import "./style.css";
import LoginForm from "../components/loginForm/loginForm";
import Logo from "../components/logo/logo";
import api from '../utils/api';

class Login extends Component {
    state = {
        username: "",
        password: ""
    };

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
                <Logo />
                <LoginForm username={this.state.username} password={this.state.password} validateForm={this.validateForm} handleChange={this.handleChange} handleLoginButton={this.handleLoginButton} />
            </div>
        );
    }
}

export default Login;