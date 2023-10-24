import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ loggedIn, handleLogout }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        {loggedIn ? (
          <>
            <li><NavLink to="/projects" className="nav-link">Projects</NavLink></li>
            <li><NavLink to="/profile" className="nav-link">Profile</NavLink></li>
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
          </>
        ) : (
          <>
            <li><NavLink to="/" className="nav-link">Register</NavLink></li>
            <li><NavLink to="/login" className="nav-link">Login</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
