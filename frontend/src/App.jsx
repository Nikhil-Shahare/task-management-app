import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, } from 'react-router-dom';
import './App.css';
import ProjectDetail from './pages/ProjectDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './component/Navbar';
import AuthProvider, { useAuth } from './context/AuthContext';
import TaskProvider from './context/TaskContext';
import ProjectProvider from './context/ProjectContext';
import TaskDetail from './pages/TaskDetail';
import TaskEdit from './pages/TaskEdit';
import UserProfileUpdate from './pages/UserProfileUpdate';
function App() {
  const { user } = useAuth();
 

 const ProtectedRoute = ({ children }) => {
  if (!user) {
    return <Navigate to="/" />;
  }



  return children;
};

const Redirect = ({children}) =>{
  if(user){
    return <Navigate to="/home"/>;

  }
  return children;
 }


 
 return (
   
   <BrowserRouter>



        <div className="app w-full ">
          <ProjectProvider>

          <TaskProvider>
          <Navbar  />
          <Routes>
            <Route path="/" element={<Redirect><Register /></Redirect>} />
            <Route path="/login" element={<Login />} />
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                
                <Route path="/profile/:userId" element={<ProtectedRoute><UserProfileUpdate /></ProtectedRoute>} />
                <Route path="/project/:projectId" element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>} />
                <Route path="/tasks/:taskId" element={<ProtectedRoute><TaskDetail /></ProtectedRoute>} />
                <Route path="/tasks/:taskId/edit" element={<ProtectedRoute><TaskEdit /></ProtectedRoute>} />


              
              <Route path='/*' element = {<ProtectedRoute><Register /></ProtectedRoute>}/>
        
          </Routes>
              </TaskProvider>
          </ProjectProvider>
        </div>
    </BrowserRouter>
  
  );
}

export default App;