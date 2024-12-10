import AddBook from './AddBook';
import Profile from './Profile';
import LeftMenu from '../../components/account/LeftMenu';
import { useAccount } from '../../context/AccountProvider';

const Account = () => {
  const { accountPage } = useAccount();

  const accountContent = () => {
    switch (accountPage) {
      case 'addBook':
        return <AddBook />;
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
        return <div>profile edit</div>;
    }
  };

  return (
    <div className="flex flex-grow">
      <LeftMenu />
      <div className="flex-1 px-5">{accountContent()}</div>
    </div>
  );
};

export default Account;
