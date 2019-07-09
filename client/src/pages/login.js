import React, { Component } from "react";
import LoginForm from "../components/loginForm/loginForm";
import Logo from "../components/logo/logo";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: "",
      password: ""
    };
  }
  componentDidMount() {
    this.props.checkIfLoggedIn();
  }
  isFormInValid = () => {
    if (this.state.username.length < 4 || this.state.password.length < 5) {
      return true;
    } else {
      return false;
    }
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormInValid()===false) {
      this.props.postLogin({ username: this.state.username, password: this.state.password });
    }
  };
  render() {
    return (
      <div>
        <Logo />
        <LoginForm username={this.state.username} password={this.state.password} isFormInValid={this.isFormInValid} handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default Login;
