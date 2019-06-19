import React, { useEffect, useRef } from 'react';
import "./style.css";
import { TweenMax, Linear } from "gsap";
import logo from './solidcolor.png';
import * as Animatable from 'react-native-animatable';

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
                <Animatable.Text animation="zoomInUp">Zoom me up, Scotty</Animatable.Text>

            <img src={logo}  ref={element => { logoElement = element }} className="App-logo" id="logo" alt="logo" />

        </div>);
}

export default Home;