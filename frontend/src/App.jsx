import { useEffect, useState } from "react"
import Navbar from './components/Navbar.jsx'
import NotFountPage from './pages/NotFountPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import Home from './pages/Home.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { Route, Routes } from "react-router-dom"
import { useAuthStore } from "./store/useAuthStore.js"
import SignedInLayout from "./layout/SignedInLayout.jsx"
import SignedOutLayout from "./layout/SignedOutLayout.jsx"
import { Toaster } from "react-hot-toast"

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if (isCheckingAuth && !authUser) {
    return (<div className="flex justify-center min-h-screen">
      <span className="loading mt-[50vh] loading-spinner loading-xl"></span></div>
    )
  }

  return (
    <div>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path='/settings' element={<SettingsPage />} />

        <Route element={<SignedInLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Route>

        <Route element={<SignedOutLayout />}>
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Route>

        <Route path="*" element={<NotFountPage />} />
      </Routes>
    </div>
  )
}

export default App
