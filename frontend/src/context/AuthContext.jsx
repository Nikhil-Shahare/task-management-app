import React, { createContext, useContext, useState,useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUsers,setAllUsers] = useState(null);
 console.log("this is user",user)
 useEffect(() => {
  const storedUserData = localStorage.getItem('userData');
  if (storedUserData) {
    setUser(JSON.parse(storedUserData));
  }
}, []);

const signIn = (userData) => {
  // Store user data in local storage when they sign in
  localStorage.setItem('userData', JSON.stringify(userData));
  setUser(userData);
};

const signOut = () => {
  // Clear the stored authentication information
  localStorage.removeItem('userData');
  setUser(null);
};

const updateUser = (data) => {
  // Update user data
  localStorage.setItem('userData', JSON.stringify(data));
  setUser(data);
};

const getAllUsers = (data) => {
  setAllUsers(data);
};
  return (
    <AuthContext.Provider value={{ user, signIn, signOut,getAllUsers,updateUser,allUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;