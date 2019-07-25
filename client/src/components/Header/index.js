import React from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css"
import { Link } from 'react-router-dom';
const Header = props => {
    return (
        <div id="res6">
            <Row>
            <Col id="head" xs={9} sm={10} md={10} lg={11} xl={11}>
                <h4>{props.children}</h4>
            </Col>
            <Col xs={3} sm={2} md={2} lg={1} xl={1}>
                <Link id="xButton" className="btn navbar-right btn-primary" to="/" type="submit">X</Link>
            </Col>
            </Row>
        </div>

    )
}

export default Header;
