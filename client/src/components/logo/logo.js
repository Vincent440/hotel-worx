import React, { useEffect, useRef } from 'react';
import logo from './solidcolor.png';
import "./style.css"

function Logo() {
    return (
        <div>
        <img src={logo} className="App-logo" id="logo" alt="logo" />
    </div>);
    }

export default Logo;