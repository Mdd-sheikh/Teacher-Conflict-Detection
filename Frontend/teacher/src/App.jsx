import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import TeacherDashboard from './components/TeacherDashboard'
import Auth from './Auth/Auth'
import PublicRoute from './Auth/routes/PublicRoute'
import PrivateRoute from './Auth/routes/privateRoute'

function App() {

  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Auth />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<TeacherDashboard />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
