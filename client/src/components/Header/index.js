import React from "react";
import "./style.css"
import { Nav, Button } from 'react-bootstrap';

const Header = props => {
    return (
        <Nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <p className="navbar-brand">{props.children}
                    </p>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <Button className="btn navbar-right" href="/" type="submit"> X
            </Button>
                </ul>
            </div>
        </Nav>

    )
}

export default Header;
