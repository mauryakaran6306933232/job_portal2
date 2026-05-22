// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const ProtectedRoute = ({ children, requiredRole }) => {
//     // 🔥 FIXED: Changed store.auth to store.user and added || {} fallback
//     const { user } = useSelector(store => store?.user) || {};

//     // If user is not logged in, send them to login page
//     if (!user) {
//         return <Navigate to="/login" />;
//     }

//     // If user's role doesn't match the required role (e.g., not a recruiter), send them home
//     if (requiredRole && user.role !== requiredRole) {
//         return <Navigate to="/" />;
//     }

//     // If all good, render the admin page
//     return children;
// };

// export default ProtectedRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requiredRole }) => {
  // Safely extract user from Redux
  const { user } = useSelector(store => store?.user) || {};

  // RULE 1: If user is not logged in, send them to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // RULE 2: If user's role doesn't match the required role (e.g., not a recruiter), send them home
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // If all checks pass, render the protected page
  return children;
};

export default ProtectedRoute;