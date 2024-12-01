import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AccountContext = createContext();
const DEFAULT_PAGE = 'myBooks';

export const useAccount = () => {
  return useContext(AccountContext);
};

export const AccountProvider = ({ children }) => {
  const initialAccountPage =
    sessionStorage.getItem('accountPage') || DEFAULT_PAGE;
  const [accountPage, setAccountPage] = useState(initialAccountPage);

  useEffect(() => {
    sessionStorage.setItem('accountPage', accountPage);
  }, [accountPage]);

  return (
    <AccountContext.Provider
      value={{
        accountPage,
        setAccountPage,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

AccountProvider.propTypes = {
  children: PropTypes.node,
};
