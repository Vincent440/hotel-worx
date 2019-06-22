import React, { useEffect, useRef } from 'react';
import { TweenMax, Linear } from "gsap";
import logo from './solidcolor.png';

const Logo = () => {
    const styles = {
        width: "30%",
        marginTop: "5%",
        marginLeft: "35%"
    };
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
            <img src={logo}  ref={element => { logoElement = element }} style={styles} className="App-logo" id="logo" alt="logo" />
        </div>);
}

export default Logo;