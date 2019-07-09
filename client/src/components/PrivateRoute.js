import React, { Component } from "react";
import { BrowserRouter as Route, Redirect } from "react-router-dom";

class PrivateRoute extends Component {
   componentDidMount(){
      console.log(this.props);
      console.log(this);
   }

   componentWillUnmount(){
      console.log(this.props);
   }
    render() {
       const {component: Component, loggedIn, ...rest} = this.props;
       const renderRoute = props => {
           if (loggedIn===true) {
              return ( <Component {...props} /> );
           }
           return ( <Redirect to="/login" /> );
       }
       return ( <Route {...rest} render={renderRoute}/> );
    }
  }

export default PrivateRoute;