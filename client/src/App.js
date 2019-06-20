import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import Home from './pages/home';

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
    state = {
        loggedIn: false
    }

    render() {
        return (
            <Router>
                <div>
                    <Particles params={particleOpt} id="particul" />

                    <ul>
                        <li><Link to='/test'>Test Protected Page</Link></li>
                    </ul>

                    <div>
                        <Switch>
                            <Route exact path="/" component={Home} />
                        </Switch>

                    </div>
                </div>
            </Router>
        );
    }
}

export default App;