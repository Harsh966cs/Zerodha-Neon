import React from 'react'
import Education from './Education'
import Hero from './Hero'
import Stats from './Stats'
import Pricing from './Pricing'
import OpenAccount from '../OpenAccount'
const HomePage = () => {
  return (
    <>
     <Hero/>
     <Stats/>
     {/* <Kite/> */}
     <Pricing/>
     <Education/>
     <OpenAccount/>
    </>
  )
}

export default HomePage