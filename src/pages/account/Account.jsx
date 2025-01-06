import AddBook from './AddBook';
import EditBook from './EditBook';
import Messages from './Messages';
import MyBooks from './MyBooks';
import OrderHistory from './OrderHistory';
import Profile from './Profile';
import SavedBooks from './SavedBooks';
import UpdateProfile from './UpdateProfile';
import LeftMenu from '../../components/account/LeftMenu';
import { useAccount } from '../../context/AccountProvider';

const Account = () => {
  const { accountPage } = useAccount();

  const accountContent = () => {
    switch (accountPage) {
      case 'addBook':
        return <AddBook />;
      case 'editBook':
        return <EditBook />;
      case 'myBooks':
        return <MyBooks />;
      case 'orderHistory':
        return <OrderHistory />;
      case 'savedBooks':
        return <SavedBooks />;
      case 'messages':
        return <Messages />;
      case 'profile':
        return <Profile />;
      case 'EditProfile':
        return <UpdateProfile />;
    }
  };

  return (
    <div className="flex h-full flex-grow">
      <LeftMenu />
      <div className="flex-1 px-5">{accountContent()}</div>
    </div>
  );
};

export default Account;
