
import {Routes , Route} from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

//url  of backend where  it is running
export const serverUrl = "http://localhost:8000"

function App() {
  return (
   <Routes>
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/signin' element={<SignIn/>} />
   </Routes>
  )
}

export default App