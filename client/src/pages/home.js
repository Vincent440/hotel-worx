import React, { useEffect, useRef } from 'react';
import "./style.css";
import { TweenMax, Linear } from "gsap";
import logo from './solidcolor.png';

const Home = () => {
    let logoElement = useRef(null);

    useEffect(() => {
        TweenMax.to(
            logoElement,
            1,
            {
                repeat: 0,
                rotation: 360,
                ease: Linear.easeNone
            }
        )
    }, []);
  
    return (
        <div>
            <img src={logo}  ref={element => { logoElement = element }} className="App-logo" id="logo" alt="logo" />

        </div>);
}

export default Home;