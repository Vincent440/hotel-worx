import React from "react";
import "./style.css"

const Header = props => {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand">{props.children}
                       
                    </a>
                </div>
                <ul class="nav navbar-nav navbar-right">
                    <button className="btn btn-secondary navbar-right" type="submit">
           <a className="exitButton" href="/">X</a>
            </button>
                </ul>
            </div>
        </nav>

    )
}

export default Header;
