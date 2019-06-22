import React, { Component } from "react";
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



import Particles from 'react-particles-js';

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

class App extends Component {

    render() {
        return (
            <div>
                <Particles params={particleOpt} id="particule" />

                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/" component={Form} />
                        </Switch>
                    </div>
                </Router>

            </div>
        );
    }
}

export default App;