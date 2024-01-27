import Loginpage from "./Components/login-page.jsx"
import Signuppage from "./Components/signup-front.jsx"
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App(){
  return(
    <BrowserRouter>
      <Routes>
      <Route index element={<Loginpage />} />
        <Route path="/Login" element={<Loginpage />} />
        <Route path="/SignUP" element={<Signuppage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App