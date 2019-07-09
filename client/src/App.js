import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Particles from "react-particles-js";
import loginAPI from "./utils/LoginAPI";
import ReserveNew from "./pages/newreservation/newreservation";
import ReserveUpdate from "./pages/updatereservation/updatereservation";
// import Reservation from "./pages/reservation/reservation";
import Dashboard from "./pages/dashboard/dashboard";
import UpdateReservation from "./pages/allreservations/allreservations";
// import Dashboard from './pages/dashboardMaster/dashMaster';
// import Reservation from './pages/reservation/reservation';
import Arrivals from "./pages/arrivals/arrivals";
import Billing from "./pages/billing/billing";
import Payment from "./pages/payment/payment";
import Inhouse from "./pages/inhouse/inhouse";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import ReservationTest from "./pages/newreservation/reservationTest";
import Housekeeping from "./pages/housekeeping/housekeeping";
import DetailedAvailability from "./pages/detailedAvailability/detailedAvailability";
import HouseStatus from "./pages/houseStatus/houseStatus";
const particleOpt = { particles: { number: { value: 120, density: { enable: true, value_area: 1000 } } } };

class PrivateRoute extends Component {
  render() {
    const { component: Component, loggedIn, ...rest } = this.props;
    const renderRoute = props => {
      if (loggedIn) {
        return <Component {...props} />;
      }
      return <Redirect to="/login" />;
    };
    return <Route {...rest} render={renderRoute} />;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.setAppLogin.bind(this);
    this.postLogin.bind(this);
    this.checkIfAppIsLoggedIn.bind(this);
    this.state = {
      user: props.user || {},
      loggedIn: false
    };
  }
  setAppLogin = () => {
    this.setState({
      user: {},
      loggedIn: false
    });
  };
  setAppLogout = () => {
    loginAPI.getLoggedOut().then(this.setAppLogin);
  };
  postLogin = userData => {
    if (userData) {
      console.log(userData);
      loginAPI.postUserLogin(userData, (err, res) => {
        if (err === true) {
          return console.log("failed to log in");
        } else {
          console.log(res);
          this.setState({ user: res.user, loggedIn: res.loggedIn });
        }
      });
    }
  };
  checkIfAppIsLoggedIn = () => {
    loginAPI.getLoginStatus().then(res => {
      this.setState({ user: res.user, loggedIn: res.loggedIn });
    });
  };
  checkServerIfLoggedIn = () => {
    loginAPI.getLoginStatus().then(res => res.loggedIn);
  };
  render() {
    let { user, loggedIn } = this.state;
    return (
      <Router>
        <div>
          <Particles params={particleOpt} id="particul" />
          <div>
            <Switch>
              <Route
                path="/login"
                exact
                strict
                render={props => (!loggedIn ? <Login {...props} user={user} checkIfLoggedIn={this.checkIfAppIsLoggedIn} loggedIn={loggedIn} postLogin={this.postLogin} /> : <Redirect to="/" />)}
              />
              <Route path="/logout" exact strict render={props => (loggedIn ? <Logout setAppLogout={this.setAppLogout} user={user} /> : <Redirect to="/login" />)} />
              <Route exact path="/login" component={Login} />
              {/* <Route exact path="/" component={Dashboard} user={user} loggedIn={loggedIn} /> */}
              <PrivateRoute path="/" exact strict component={Dashboard} loggedIn={loggedIn} user={user} />
              <Route exact path="/reserve/new" component={ReserveNew} />
              <Route exact path="/reserve/allreservations" component={UpdateReservation} />
              <Route exact path="/reserve/testUpdatereservation" component={ReserveUpdate} />
              <Route exact path="/reserve/testreservation" component={ReservationTest} />
              <Route exact path="/frontdesk/arrivals" component={Arrivals} />
              <Route exact path="/frontdesk/inhouse" component={Inhouse} />
              <Route exact path="/cashiering/billing" component={Billing} />
              <Route exact path="/cashiering/payment" component={Payment} />
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
