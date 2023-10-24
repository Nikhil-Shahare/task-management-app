import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allusers,setAllUsers] = useState(null);
 console.log("this is user",user)
  const signIn = (userData) => {
    setUser(userData);
  };

  const signOut = () => {
    setUser(null);
  };

const getAllUsers = (data) =>{
  setAllUsers(data);
  console.log("these are all users",allusers)
}
  return (
    <AuthContext.Provider value={{ user, signIn, signOut,getAllUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
