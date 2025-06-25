import React from 'react'
import { Route, BrowserRouter as Router, Routes } from "react-router"
import Homepage from './pages/Homepage.jsx'
import About from './pages/about.jsx'
import Contact from './pages/Contact.jsx'
import Navbar from './pages/components/Navbar.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
const App = () => {
  return (
    <Router>
      <Navbar />  
      <Routes>
        <Route path='' element={<Homepage></Homepage>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
      </Routes>
    </Router>
  )
}


export default App

