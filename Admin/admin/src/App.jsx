import { useState } from 'react'
import './App.css'
import Auth from './auth/Auth'
import { Routes, Route } from 'react-router-dom'
import PublicRoute from './Routes/PublicRoute'
import Dashboard from './pages/dashboard_overview/DashboardOverview'
import PrivateRoute from './Routes/PrivateRoute'
import Room from './pages/room/Room'
import Subjects from './pages/subject/Subject'
import Timetable from './pages/timtable/TimeTable'
import Settings from './pages/setting/Setting'

function App() {


  return (
    <>
      <Dashboard />
      <Routes>

        <Route path='/' element={<Auth />} />



        <Route path='/room' element={<Room />} />
        <Route path='/subjects' element={<Subjects />} />
        <Route path='/timetable' element={<Timetable />} />
        <Route path='/settings' element={<Settings />} />




      </Routes>
    </>
  )
}

export default App;
