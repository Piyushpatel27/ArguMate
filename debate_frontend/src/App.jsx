import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { SignedIn , SignedOut, RedirectToSignIn,RedirectToSignUp } from '@clerk/clerk-react'
import './App.css'

import About from './pages/About'
import Homepage from './pages/Homepage'
import Landingpage from './pages/Landingpage'
import Debateroom from './pages/Debateroom'
import Navbar from './components/Navbar'
import Sign from './components/Sign'
import Login from './components/Login'

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element ={<SignedIn><Homepage/></SignedIn>}/>
          <Route path="/landing" element ={<Landingpage/>}/>
          <Route path="/debate" element ={<SignedIn><Debateroom/></SignedIn>}/>
          <Route path="/signup" element={<SignedOut><Sign/></SignedOut>}/>
          <Route path="/login" element={<SignedOut><Login/></SignedOut>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
