import Profile from './Profile';
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
    updateEmail, // Get updateEmail from context
  } = useAccount();

  const accountContent = () => {
    switch (accountPage) {
      case 'addBook':
        return <div>addBook</div>;
      case 'myBooks':
        return <div>myBooks</div>;
      case 'orderHistory':
        return <div>orderHistory</div>;
      case 'savedBooks':
        return <div>savedBooks</div>;
      case 'messages':
        return <div>messages</div>;
      case 'profile':
        return <Profile />;
      case 'profileEdit':
<<<<<<< HEAD
        return (
          <UpdateProfile
            setFirstName={setFirstName}
            setLastName={setLastName}
            setLocation={setLocation}
            saveProfile={saveProfile}
            cancelUpdate={cancelUpdate}
            updateEmail={updateEmail} // Pass updateEmail to UpdateProfile
          />
        );
      default:
        return <div>Page not found</div>;
=======
        return <div>profile edit</div>;
>>>>>>> 5bce2ec ([RB-21] Profile Page (Account Folder) (#24))
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
