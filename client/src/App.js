import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import ReserveNew from './pages/newreservation/newreservation';
import ReserveUpdate from './pages/updatereservation/updatereservation';
import Reservation from './pages/reservation/reservation';
import Dashboard from './pages/dashboard/dashboard';
import UpdateReservation from './pages/allreservations/allreservations';
// import Dashboard from './pages/dashboardMaster/dashMaster';
// import Reservation from './pages/reservation/reservation';
import Arrivals from './pages/arrivals/arrivals';
import Billing from './pages/billing/billing';
import Payment from './pages/payment/payment';
import Inhouse from './pages/inhouse/inhouse';
// import Login from './pages/login';
import LoginForm from "./components/loginForm/loginForm";
import Logo from "./components/logo/logo";
import Particles from 'react-particles-js';
import ReservationTest from './pages/reservationTest';
import Housekeeping from './pages/housekeeping/housekeeping';
import DetailedAvailability from './pages/detailedAvailability/detailedAvailability';
import HouseStatus from "./pages/houseStatus/houseStatus";



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
            <Router>
                <div>
                    <Particles params={particleOpt} id="particul" />

                    <div>
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/" component={Dashboard} />
                            <Route exact path="/reserve/new" component={ReserveNew} />
                            <Route exact path="/reserve/allreservations" component={UpdateReservation} />
                            <Route exact path="/reserve/testUpdatereservation" component={ReserveUpdate} />
                            <Route exact path="/reserve/testreservation" component={Reservation} />
                            <Route exact path="/frontdesk/arrivals" component={Arrivals} />
                            <Route exact path="/frontdesk/inhouse" component={Inhouse} />
                            <Route exact path="/cashiering/billing" component={Billing} />
                            <Route exact path="/cashiering/payment" component={Payment} />
                            <Route exact path="/reservationTest" component={ReservationTest} />
                            <Route exact path="/reports/housekeeping" component={Housekeeping} />
                            <Route exact path="/reports/detailedAvailability" component={DetailedAvailability} />
                            <Route exact path="/reports/houseStatus" component={HouseStatus} />



                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;