import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, } from 'react-router-dom';
import './App.css';
import Profile from './pages/Profile';
import ProjectDetail from './pages/ProjectDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './component/Navbar';
import AuthProvider, { useAuth } from './context/AuthContext';
import TaskProvider from './context/TaskContext';

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



        <div className="app w-full">
          <Navbar  />
              <TaskProvider>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/project/:projectId" element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>} />
              
              <Route path='/*' element = {<ProtectedRoute><Register /></ProtectedRoute>}/>
        
          </Routes>
              </TaskProvider>
        </div>
    </BrowserRouter>
  
  );
}

export default App;
