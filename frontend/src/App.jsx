import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <div>
      <ToastContainer/>
     <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
     </Routes>
    </div>
  )
}

export default App