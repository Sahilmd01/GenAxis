import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Aitools from '../components/Aitools'
import Testimonial from '../components/Testimonial'
import Plans from '../components/Plans'
// import { Footor } from '../components/Footor'

const Home = () => {

  return (
    <>
      <Navbar/>
      <Hero/>
      <Aitools/>
      <Testimonial/>
      <Plans/>
      {/* <Footor/> */}
    </>
  )
}

export default Home