import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AccountContext = createContext();
const DEFAULT_PAGE = 'myBooks';

export const useAccount = () => {
  return useContext(AccountContext);
};

export const AccountProvider = ({ children }) => {
  const initialAccountPage = sessionStorage.getItem('accountPage') || DEFAULT_PAGE;
  const [accountPage, setAccountPage] = useState(initialAccountPage);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');

  // Define the functions you want to pass to the child components
  const saveProfile = () => {
    // logic to save profile
    console.log('Profile saved');
  };

  const cancelUpdate = () => {
    // logic to cancel the update
    console.log('Update cancelled');
  };

  useEffect(() => {
    sessionStorage.setItem('accountPage', accountPage);
  }, [accountPage]);

  return (
    <AccountContext.Provider
      value={{
        accountPage,
        setAccountPage,
        setFirstName,
        setLastName,
        setEmail,
        setLocation,
        saveProfile,
        cancelUpdate,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

AccountProvider.propTypes = {
  children: PropTypes.node,
};
