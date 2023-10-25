import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.css"
import logo from "../assets/logo.png"
import { useAuth } from '../context/AuthContext';
const Navbar = () => {
    const { user, signOut } = useAuth();
    const handleLogout = () => {
        // Log the user out by clearing user details from the context
        signOut(null);
      };
  return (
    <nav className="navbar w-full bg-slate-800  flex justify-between  ">
        <div className='nav-logo  flex '>
            <NavLink to="/home" className= "title ">
                <img src= {logo}  className='w-5 h-5  ml-2 bg-green'/>
                <div className='flex text-white ml-0.5'>GoTasks</div>
            </NavLink>
        </div>
        
        
      <ul className="navbar-links flex space-x-4 justify-end mx-10" >
        {user ? (
          <>
            <li  className='list'><NavLink to="/projects" className="nav-link ">Projects</NavLink></li>
            <li className='list'><NavLink to="/profile" className="nav-link text-xl">Profile</NavLink></li>
            <li className='list'><button onClick={handleLogout} className="logout-button">Logout</button></li>
          </>
        ) : (
          <>
            <li className='list'><NavLink to="/" className="nav-link">Register</NavLink></li>
            <li className='list'><NavLink to="/login" className="nav-link">Login</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;