import React, { Component } from "react";
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Home from './pages/home';
// import Form from './pages/newreservation/newreservation';
 import Form from './pages/updatereservation/updatereservation';
// import Login from "./components/login/login";
// import Dashboard from './pages/dashboard/dashboard';
// import FormUpdate from './pages/allreservations/allreservations';
// import Dashboard from './pages/dashboardMaster/dashMaster';
// import Reservation from './pages/reservation/reservation';
// import FormUpdate from './pages/arrivals/arrivals';
// import FormUpdate from './pages/inhouse/inhouse';
// import FormUpdate from './pages/departures/departures';


=======
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import Dashboard from './pages/dashboard';
// import Login from './pages/login';

import LoginForm from "./components/loginForm/loginForm";
import Logo from "./components/logo/logo";
>>>>>>> bd44e727acfb34c4ea8e4cadb97bf5c5591f791d

import Particles from 'react-particles-js';

// import Home from './pages/home';
// import Form from './pages/newreservation/newreservation';
// import Form from './pages/updatereservation/updatereservation';
// import Login from "./components/login/login";
// import Dashboard from './pages/dashboard/dashboard';
// import FormUpdate from './pages/allreservations/allreservations';
// import Dashboard from './pages/dashboardMaster/dashMaster';
// import Reservation from './pages/reservation/reservation';
// import FormUpdate from './pages/arrivals/arrivals';
// import FormUpdate from './pages/inhouse/inhouse';
// import FormUpdate from './pages/departures/departures';

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100) // fake async
    }
}

class Login extends Component {
    state = {
        redirectToReferrer: false
    }
    login = () => {
        fakeAuth.authenticate(() => {
            this.setState(() => ({
                redirectToReferrer: true
            }))
        })
    }
    render() {
        const { redirectToReferrer } = this.state

        if (redirectToReferrer === true) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <Logo />
                {/* <LoginForm username={this.state.username} password={this.state.password} validateForm={this.validateForm} handleChange={this.handleChange} handleLoginButton={this.handleLoginButton} /> */}
                <LoginForm login={this.login} />
            </div>
        )
    }
}

const particleOpt = {
    particles: {
        number: {
            value: 120,
            density: {
                enable: true,
                value_area: 1000,
            }
        },
    },
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        fakeAuth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to='/login' />

    )} />
)

class App extends Component {
    state = {
        loggedIn: false
    }

    render() {
        return (
<<<<<<< HEAD
            <div>
                <Particles params={particleOpt} id="particule" />
=======
            <Router>
                <div>
                    <Particles params={particleOpt} id="particul" />
>>>>>>> bd44e727acfb34c4ea8e4cadb97bf5c5591f791d

                    <div>
                        <Switch>
<<<<<<< HEAD
                            <Route exact path="/" component={Form} />
                        </Switch>
                    </div>
                </Router>

            </div>
=======
                            <Route exact path="/login" component={Login} />
                            <PrivateRoute exact path="/" component={Dashboard} />
                        </Switch>

                    </div>
                </div>
            </Router>
>>>>>>> bd44e727acfb34c4ea8e4cadb97bf5c5591f791d
        );
    }
}

export default App;