import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PrivateRoute = ({ children }) => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Avoid redirecting during loading
  }

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
