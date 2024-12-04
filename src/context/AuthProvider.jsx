import React, { createContext, useContext, useState } from 'react';

import PropTypes from 'prop-types';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const initialToken = JSON.parse(sessionStorage.getItem('token')) || '';
  const initialUser = JSON.parse(sessionStorage.getItem('user')) || {};
  const [token, setToken] = useState(initialToken);
  const [userData, setUserData] = useState(initialUser);
  const [isLoggedIn, setIsLoggedIn] = useState(!!initialToken);

  const setUserSession = ({ user, token }) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('token', JSON.stringify(token));
    setIsLoggedIn(true);
    setUserData(user);
    setToken(token);
  };

  const clearUserSession = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserData({});
    setToken('');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userData,
        token,
        setUserSession,
        clearUserSession,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
