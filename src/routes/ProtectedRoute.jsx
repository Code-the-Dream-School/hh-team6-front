import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Navigate to="/sign_in" replace />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.node,
};

export default ProtectedRoute;
