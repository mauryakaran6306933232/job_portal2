import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  // Safely extract user from Redux
  const { user } = useSelector(store => store?.user) || {};

  // If user IS logged in, redirect them to Home page
  if (user) {
    return <Navigate to="/" replace />;
  }

  // If user is NOT logged in, allow them to see the Login/Signup page
  return children;
};

export default PublicRoute;