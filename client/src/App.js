import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/home';
import Login from "./components/login/login";
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
                <Particles params={particleOpt} id="particul"/>

                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home} />
                        </Switch>
                        <Login></Login>

                    </div>

                </Router>

            </div>
        );
    }
}

export default App;