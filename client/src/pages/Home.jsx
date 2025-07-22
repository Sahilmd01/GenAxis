import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Aitools from '../components/Aitools'
import Testimonial from '../components/Testimonial'
import Plans from '../components/Plans'
import Footer from '../components/Footer' 

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Aitools />
      <Testimonial />
      <Plans />
      <Footer /> 
    </>
  )
}

export default Home
