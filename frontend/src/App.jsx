import { useState } from 'react'
import { BrowserRouter , Route, Router, Routes,Navigate} from "react-router-dom";
import './App.css'
import Profile from './pages/Profile';
import Projects from './pages/Projects';
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home';
import Navbar from './component/Navbar';
function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const handleSignin =() =>{
    console.log("i ran")
    setLoggedIn(true);
  }

  const handleLogout = () => {
    setLoggedIn(false);
  }
  return (
    <BrowserRouter>
    <div className='app'>

       <Navbar loggedIn={loggedIn} handleLogout={handleLogout} />
    <Routes>
      <Route  path = "/" element = {<Register />}/>
      <Route  path = "/login" element = {<Login signIn = {handleSignin}/>}/>
      <Route  path = "/home" element = {<Home/>}/>
      {
        loggedIn &&(
          <>
           <Route path="/projects" element={<Projects />} />
           <Route path="/profile" element={<Profile />} />
          </>
         )
         
        }
       
    </Routes>
        </div>
    
    </BrowserRouter>
  )
}

export default App
// VITE_CLOUD_NAME=dqgbl2cyj
// VITE_API_KEY=588619153123757
// VITE_API_SECRET= bn-7DrOwQ5DoUM8zKDozzoZWZQg
// VITE_UPLOAD_PRESET= 108harekrishna