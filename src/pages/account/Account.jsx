import React from 'react';
import Profile from './Profile';
import UpdateProfile from './UpdateProfile';
import LeftMenu from '../../components/account/LeftMenu';
import { useAccount } from '../../context/AccountProvider';

const Account = () => {
  const {
    accountPage,
    setFirstName,
    setLastName,
    setLocation,
    saveProfile,
    cancelUpdate,
    updateEmail,  // Get updateEmail from context
  } = useAccount();

  const accountContent = () => {
    switch (accountPage) {
      case 'profile':
        return <Profile />;
      case 'profileEdit':
        return (
          <UpdateProfile
            setFirstName={setFirstName}
            setLastName={setLastName}
            setLocation={setLocation}
            saveProfile={saveProfile}
            cancelUpdate={cancelUpdate}
            updateEmail={updateEmail}  // Pass updateEmail to UpdateProfile
          />
        );
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="flex flex-grow">
      <LeftMenu />
      <div className="flex-1 p-6">{accountContent()}</div>
    </div>
  );
};

export default Account;
