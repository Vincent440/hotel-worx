import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import UserContext from "./UserContext";
import authapi from "./utils/authapi";
import ReserveNew from "./pages/newreservation/newreservation";
import ReserveUpdate from "./pages/updatereservation/updatereservation";
import Dashboard from "./pages/dashboard/dashboard";
import UpdateReservation from "./pages/allreservations/allreservations";
import Arrivals from "./pages/arrivals/arrivals";
import Billing from "./pages/billing/billing";
import Payment from "./pages/payment/payment";
import Inhouse from "./pages/inhouse/inhouse";
import Login from "./pages/login/login";
import ReservationTest from "./pages/newreservation/reservationTest";
import Housekeeping from "./pages/housekeeping/housekeeping";
import DetailedAvailability from "./pages/detailedAvailability/detailedAvailability";
import HouseStatus from "./pages/houseStatus/houseStatus";
import Maintenance from "./pages/maintenance/maintenance";


const PrivateAccessRoute = ({ component: Component, aId, ...rest }) => (
  <UserContext.Consumer>
    {({ user }) => (
      <Route
        {...rest}
        render={props =>
          user.access_id >= aId ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    )}
  </UserContext.Consumer>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.postUserLogin = userData => {
      if (userData) {
        authapi.postUserLogin(userData, (err, res) => {
          if (err === true) {
            return console.log("an error occurred failed to log user in.");
          }
          this.setState({ user: res.user });
        });
      }
    };
    this.getUserLogout = event => {
      event.preventDefault();
      authapi.getLoggedOut().then(this.getUserStatus);
    };
    this.getUserStatus = () => {
      authapi.getLoginStatus().then(res => {
        if (res) {
          this.setState(()=>(
            { user: res.user }
            )
          );
        }
      });
    };
    this.state = {
      user: {
        access_id: 0,
        type: "Guest",
        user_id: 0,
        username: "guest"
      },
      getUserStatus: this.getUserStatus,
      getUserLogout: this.getUserLogout,
      postUserLogin: this.postUserLogin
    };
  }
  render() {
    let { user } = this.state;
    return (
      <UserContext.Provider value={this.state}>
        <Router> 
          { user.access_id === 0 ? (
            <div>
              <Redirect to="/" />
              <Login />
            </div> ) : 
          (
            <Switch>
              <PrivateAccessRoute exact strict path="/" component={Dashboard} aId="1" />
              <PrivateAccessRoute exact path="/reserve/new" component={ReserveNew} aId="1" />
              <PrivateAccessRoute exact path="/reserve/allreservations" component={UpdateReservation} aId="1" />
              <PrivateAccessRoute exact path="/reserve/testUpdatereservation" component={ReserveUpdate} aId="1" />
              <PrivateAccessRoute exact path="/reserve/testreservation" component={ReservationTest} aId="1" />
              <PrivateAccessRoute exact path="/frontdesk/arrivals" component={Arrivals} aId="1" />
              <PrivateAccessRoute exact path="/frontdesk/inhouse" component={Inhouse} aId="1" />
              <PrivateAccessRoute exact path="/frontdesk/maintenance" component={Maintenance} aId="1" />
              <PrivateAccessRoute exact path="/cashiering/billing" component={Billing} aId="1" />
              <PrivateAccessRoute exact path="/cashiering/payment" component={Payment} aId="1" />
              <PrivateAccessRoute exact path="/reports/housekeeping" component={Housekeeping} aId="1" />
              <PrivateAccessRoute exact path="/reports/detailedAvailability" component={DetailedAvailability} aId="1" />
              <PrivateAccessRoute exact path="/reports/houseStatus" component={HouseStatus} aId="1" />
            </Switch>
          )
        }
        </Router>
      </UserContext.Provider>
    );
  }
}

export default App;