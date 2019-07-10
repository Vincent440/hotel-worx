import React from "react";
import "./style.css"
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
const Header = props => {
    return (
        <Nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <p className="navbar-brand">{props.children}
                    </p>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <Link className="btn navbar-right btn-primary"  to="/" type="submit">X</Link>
                </ul>
            </div>
        </Nav>

    )
}

export default Header;
