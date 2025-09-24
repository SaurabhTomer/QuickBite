import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

const App = () => {
  return (
    <div>
      <Routes>
       <Route path='/' element={<Navigate to="/signup" replace />} />
       <Route path='/signup' element={<SignUp/>}/>
       <Route path='/signin' element={<SignIn/>}/>
       
      </Routes>
    </div>
  )
}

export default App