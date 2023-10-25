import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUsers,setAllUsers] = useState(null);
 console.log("this is user",user)
  const signIn = (userData) => {
    setUser(userData);
  };

  const signOut = () => {
    setUser(null);
  };
  const updateUser = (data) =>{
    setUser(data)
  }

const getAllUsers = (data) =>{
  setAllUsers(data);
}
  return (
    <AuthContext.Provider value={{ user, signIn, signOut,getAllUsers,updateUser,allUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;