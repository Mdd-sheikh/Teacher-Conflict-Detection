import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import TeacherDashboard from './components/TeacherDashboard'
import Auth from './Auth/Auth'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<TeacherDashboard />} />

      </Routes>
    </>
  )
}

export default App
