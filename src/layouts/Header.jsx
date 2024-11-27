import React from 'react';
import { useAuth } from '../context/AuthProvider';

const Header = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div>{isLoggedIn ? 'You are logged in' : 'You are not logged in'}</div>
  );
};

export default Header;
