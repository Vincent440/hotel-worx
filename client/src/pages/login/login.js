import React, { Component } from "react";
import { Container } from 'react-bootstrap';
import LoginForm from "../../components/loginForm/loginForm";
import "./style.css";
import Logo from "../../components/logo/logo";
import BackgroundSlider from 'react-background-slider';
import image3 from './hotel3.jpg';
import image5 from './hotel5.jpg';
import image6 from './hotel6.jpg';
import image8 from './image8.jpg';
import UserContext from '../../UserContext';

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    };
    this.handleSubmit = event => {
      event.preventDefault();
      if (!this.isFormInValid()) {
        console.log(this.context);
        this.context.postUserLogin({ username: this.state.username, password: this.state.password });
      }
    };
    this.state = {
      username: "",
      password: ""
    };
  }
  componentDidMount() {
    if (this.context.user.access_id === 0) {
      this.context.getUserStatus();
    }
  }
  isFormInValid = () => {
    if (this.state.username.length < 4 || this.state.password.length < 5) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <span>
        <BackgroundSlider
          images={[ image3, image5, image6,image8]}
          duration={5}
          transition={1} />
        <Container>
          <div id="logoLogin">
            <Logo />
            <LoginForm username={this.state.username} password={this.state.password} isFormInValid={this.isFormInValid} handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit} />
          </div>
        </Container> 
      </span>
    );
  }
}
Login.contextType = UserContext;
export default Login;
