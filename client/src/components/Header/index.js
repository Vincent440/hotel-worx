import React from "react";
import { Row, Col } from 'react-grid-system';
import "./style.css"
import { Link } from 'react-router-dom';
const Header = props => {
    return (
        <div id="res">
            <Row>
            <Col id="head" xs={11} sm={11} md={11} lg={11} xl={11}>
                <h4>{props.children}</h4>
            </Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                <Link className="btn navbar-right btn-primary" to="/" type="submit">X</Link>
            </Col>
            </Row>
        </div>

    )
}

export default Header;
