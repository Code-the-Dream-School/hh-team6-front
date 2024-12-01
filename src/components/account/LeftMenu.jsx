import { useAuth } from '../../context/AuthProvider';
import { Button } from '@headlessui/react';

import { useAccount } from '../../context/AccountProvider';
import ChangePageButton from './ChangePageButton';

const LeftMenu = () => {
  const { clearUserSession } = useAuth();
  const { setAccountPage } = useAccount();

  return (
    <div className="ml-5 hidden rounded-md border border-gray p-3 sm:block">
      <div>
        <Button
          as="button"
          onClick={() => setAccountPage('addBook')}
          className="mb-6 rounded-md bg-blueGray px-3 py-1 text-white"
        >
          + Add New Listing
        </Button>
      </div>

      <ChangePageButton page="myBooks" label="My Book Listings" />
      <ChangePageButton page="orderHistory" label="Order History" />
      <ChangePageButton page="savedBooks" label="Saved Books" />
      <ChangePageButton page="messages" label="Messages" />
      <hr className="my-7 border-blueGray" />
      <ChangePageButton page="profile" label="Profile" />

      <div>
        <Button as="button" className="my-1" onClick={clearUserSession}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default LeftMenu;
