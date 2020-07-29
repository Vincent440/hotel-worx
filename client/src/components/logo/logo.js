import React, { useEffect, useRef } from 'react'
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
    <div id='logoDiv' className='pt-3 m-0 mx-auto'>
      <img src={logo} ref={element => { logoElement = element }} className='App-logo w-100 mb-3' id='logo' alt='logo' />
    </div>)
}

export default Logo
