import React from 'react'

import { Route, Routes, Navigate } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import { Toaster } from 'react-hot-toast'
import useGetCurrentUser from './../hooks/useGetCurrentUser';

const App = () => {
  useGetCurrentUser()
  return (
    <div>
      <Toaster position='top-center' reverseOrder={false}/>
      <Routes>
       <Route path='/' element={<Navigate to="/signup" replace />} />
       <Route path='/signup' element={<SignUp/>}/>
       <Route path='/signin' element={<SignIn/>}/>
       <Route path='/forgot-password' element={<ForgotPassword/>}/>
       
      </Routes>
    </div>
  )
}

export default App