import { useState } from 'react'
import './App.css'
import Auth from './auth/Auth'
import { Routes, Route } from 'react-router-dom'
import PublicRoute from './Routes/PublicRoute'
import PrivateRoute from './Routes/PrivateRoute'
import { Check } from 'lucide-react'
import EduSchedAdmin from './components/EduSchedAdmin'


function App() {


  return (
    <>

<EduSchedAdmin/>

      <Routes>
        <Route element={<PublicRoute/>}>

          <Route path='/' element={<Auth />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path='/check' element={<Check />} />
        </Route>

      </Routes>
    </>
  )
}

export default App;
