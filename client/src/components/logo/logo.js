import React, { useEffect, useRef } from 'react'
import './style.css'
import { TweenMax, Linear } from 'gsap'
import logo from './hotelworx_logo.png'

const Logo = () => {
  let logoElement = useRef(null)

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
  }, [])

  return (
    <div id='logoDiv'>
      <img src={logo} ref={element => { logoElement = element }} className='App-logo' id='logo' alt='logo' />
    </div>)
}

export default Logo
