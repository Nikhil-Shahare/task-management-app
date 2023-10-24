import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, } from 'react-router-dom';
import './App.css';
import Profile from './pages/Profile';
import Projects from './pages/Projects';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './component/Navbar';
import AuthProvider, { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();
 

 const ProtectedRoute = ({ children }) => {
  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

 
 return (
   
   <BrowserRouter>



        <div className="app bg-slate-800 w-full">
          <Navbar  />
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            
            
              <Route path='/*' element = {<Register />}/>
        
          </Routes>
        </div>
    </BrowserRouter>
  
  );
}

export default App;
