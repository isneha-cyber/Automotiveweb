import React from 'react'
import Hero from '../components/Hero'
import KiaToutCards from '../components/Kiatoutcards'
import TrustedBanner from '../components/Trustedbanner'
import Kiafleet from '../components/Kiafleetcarousel'
import Service from '../components/Service'
import Blog from '../components/Blog'

const HomePage = () => {
  return (
  <>
  <Hero/>
  <KiaToutCards/>
   <TrustedBanner/>
  <Kiafleet/>
      <Service/>
      <Blog/>
  </>
  )
}

export default HomePage