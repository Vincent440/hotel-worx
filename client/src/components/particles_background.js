import React from 'react'
import Particles from 'react-particles-js'

const particleOptions = {
  particles: {
    number: { value: 120, density: { enable: true, value_area: 1000 } }
  }
}
const ParticlesBackground = () => <Particles params={particleOptions} />

export default ParticlesBackground
