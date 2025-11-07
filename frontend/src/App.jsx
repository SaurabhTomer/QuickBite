
import {Routes , Route} from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import usegetCurrentuser from '../hooks/usegetCurrentuser'

//url  of backend where  it is running
export const serverUrl = "http://localhost:8000"

function App() {
  usegetCurrentuser()
  return (
   <Routes>
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
   </Routes>
  )
}

export default App