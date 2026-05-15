import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Notes from './components/pages/notes/Notes'
import Attendance from './components/pages/attendence/Attendence'
import Profile from './components/pages/profile/Profile'
import Timetable from './components/pages/timetable/Timetable'
import { Routes, Route } from 'react-router-dom'


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Timetable />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/attendence' element={<Attendance />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
