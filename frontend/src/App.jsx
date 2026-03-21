import { useState } from "react"
import Navbar from './components/Navbar.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { Route, Routes } from "react-router-dom"

function App() {

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='/settings' element={<SettingsPage/>}/>
        <Route path='profile' element={<ProfilePage/>}/>
      </Routes>
    </div>
  )
}

export default App
