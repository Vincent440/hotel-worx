import React, { useEffect, useRef } from 'react'
import { TweenMax, Linear } from 'gsap'
import logo from './hotelworx_logo.png'
import Card from 'react-bootstrap/esm/Card'
const Logo = () => {
  let logoElement = useRef(null)

  useEffect(() => {
    TweenMax.to(logoElement, 1, {
      repeat: 0,
      rotation: 360,
      ease: Linear.easeNone
    })
  }, [])
  return (
    <Card.Img
      className='rounded-circle'
      style={{ maxWidth: '225px' }}
      src={logo}
      ref={element => {
        logoElement = element
      }}
      alt='logo'
    />
  )
}

export default Logo
