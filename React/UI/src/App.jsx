import React from 'react'
import Landing from './pages/Landing'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import AddEvent from './pages/AddEvent'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to="/landing" />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/landing" element={<Landing />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/home' element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/addEvent' element={<AddEvent />} />
      


      
    </Routes>
    </BrowserRouter>

  )
}

export default App