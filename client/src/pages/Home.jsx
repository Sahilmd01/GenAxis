import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Aitools from '../components/Aitools'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import Faqs from '../components/Faqs'
// import Newsletter from '../components/Newsletter'
import Plans from '../components/Plans'
import Social from '../components/Social'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Aitools />
      <Banner />
      <Testimonial />
      <Faqs />
      {/* <Newsletter /> */}
      <Plans />
      <Social />

      <Footer />
    </>
  )
}

export default Home
