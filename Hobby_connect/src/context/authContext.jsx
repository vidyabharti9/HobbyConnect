// src/context/authContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Initialize context from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    try {
      if (storedUser && storedToken) {
        // Safely parse JSON only if data exists
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Error parsing user or token from localStorage:", error);
    }
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
