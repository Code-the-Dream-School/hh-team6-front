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
  const [currentBookId, setCurrentBookId] = useState(
    sessionStorage.getItem('currentBookId') || ''
  );
  const [currentChatId, setCurrentChatId] = useState(
    sessionStorage.getItem('currentChatId') || ''
  );

  useEffect(() => {
    sessionStorage.setItem('accountPage', accountPage);
  }, [accountPage]);

  useEffect(() => {
    sessionStorage.setItem('currentBookId', currentBookId);
  }, [currentBookId]);

  useEffect(() => {
    sessionStorage.setItem('currentChatId', currentChatId);
  }, [currentChatId]);

  const clearAccount = () => {
    setAccountPage('');
    setCurrentBookId('');
    setCurrentChatId('');
  };

  return (
    <AccountContext.Provider
      value={{
        accountPage,
        setAccountPage,
        currentBookId,
        setCurrentBookId,
        currentChatId,
        setCurrentChatId,
        clearAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

AccountProvider.propTypes = {
  children: PropTypes.node,
};
