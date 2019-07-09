import React from "react";

class Logout extends React.Component {
    componentDidMount(){
      setTimeout(()=>this.callAppLogOut(),4000);
    }
    callAppLogOut=()=>{
      this.props.setAppLogout();
    }
    render(){
      return (<h1 className="display-1 text-white bg-dark text-center p-5">{`Goodbye: ${this.props.user.username} is now logged out. `||"You are already logged out."}<small className="small">Redirecting to login</small></h1>);
    }
}
export default Logout;