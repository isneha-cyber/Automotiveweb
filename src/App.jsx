import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
// import Showcase from './components/Showcase'
import TrustedBanner from './components/Trustedbanner'
import Service from './components/Service'
import Footer from './components/Footer'
import Blog from './components/Blog'
import KiaFleetCarousel from './components/Kiafleetcarousel'
import KiaToutCards from './components/Kiatoutcards'

function App() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <KiaToutCards/>
    {/* <Showcase/> */}
    <TrustedBanner/>
<KiaFleetCarousel/>
    <Service/>
   
    <Blog/>
    <Footer/>
    
    </>
  )
}

export default App
