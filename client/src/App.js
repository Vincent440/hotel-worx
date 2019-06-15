import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './pages/home';
import Header from './components/header';
import Footer from './components/footer';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home} />
                        </Switch>

                    </div>
                </Router>
                <Footer />
            </div>
        );
    }
}

export default App;