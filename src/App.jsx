import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { auth } from './helpers/firebase'

import Login from './Components/Login'
import SignUp from './Components/Register'
import Profile from './Components/Profile'
import Test from './Components/Test'

import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  const [user, setUser] = useState()
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
    })
  }, [])

  if (!user) return alert(`No user Found`)
  
  return (
    <div>
      <Routes
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 100,
        }}
      >
        <Route
          path="/"
          element={user ? <Navigate to="/profile" /> : <Login />}
        />
        <Route path="/test" element={user ? <Test /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/profile" element={user ? <Profile /> : <Login />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
