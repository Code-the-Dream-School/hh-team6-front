import { useAccount } from '../../context/AccountProvider';
import LeftMenu from '../../components/account/LeftMenu';

const Account = () => {
  const { accountPage } = useAccount();

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
        return <div>profile</div>;
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
