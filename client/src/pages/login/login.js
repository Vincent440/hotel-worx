import React, { Component } from "react";
import { Container } from 'react-bootstrap';
import LoginForm from "../../components/loginForm/loginForm";
import "./style.css";
import Logo from "../../components/logo/logo";
import BackgroundSlider from 'react-background-slider';
import image6 from './image8.jpg';
import image3 from './image7.jpeg';
import image4 from './hotel5.jpg';
import image5 from './hotel6.jpg';

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
    if (this.isFormInValid() === false) {
      this.props.postLogin({ username: this.state.username, password: this.state.password });
    }
  };
  render() {
    return (
      <div>
        <BackgroundSlider
          images={[image3, image4, image5, image6]}
          duration={5}
          transition={1} />
        <Container>
          <div id="logoLogin">
            <Logo />
            <LoginForm username={this.state.username} password={this.state.password} isFormInValid={this.isFormInValid} handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit} />
          </div>
        </Container>
      </div>
    );
  }
}

export default Login;
