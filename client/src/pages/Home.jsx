import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Aitools from '../components/Aitools'
import Testimonial from '../components/Testimonial'
import Social from '../components/Social'
import Plans from '../components/Plans'
import Footer from '../components/Footer' 

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Aitools />
      <Testimonial />
      <Social/>
      <Plans />
      <Footer /> 
    </>
  )
}

export default Home
