import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import VehiclePage from './pages/VehicledetailPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route path="/" element={<HomePage/>} />
      <Route path="/detailpage" element={<VehiclePage/>} />
    </Routes>
    <Footer/>
    </BrowserRouter>
    
    </>
  )
}

export default App
