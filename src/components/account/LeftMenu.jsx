import { Button } from '@headlessui/react';

import AddBookButton from './AddBookButton';
import ChangePageButton from './ChangePageButton';
import { useAuth } from '../../context/AuthProvider';

const LeftMenu = () => {
  const { clearUserSession } = useAuth();

  return (
    <aside className="mx-5 hidden rounded-md border border-gray p-3 sm:block">
      <nav>
        <AddBookButton />
        <ul className="space-y-4">
          <li key="myBooks">
            <ChangePageButton page="myBooks" label="My Book Listings" />
          </li>
          <li key="orderHistory">
            <ChangePageButton page="orderHistory" label="Order History" />
          </li>
          <li key="savedBooks">
            <ChangePageButton page="savedBooks" label="Saved Books" />
          </li>
          <li key="messages">
            <ChangePageButton page="messages" label="Messages" />
          </li>
        </ul>

        <hr className="my-10 border-blueGray" />

        <ul className="space-y-4">
          <li key="profile">
            <ChangePageButton page="profile" label="Profile" />
          </li>
          <li key="logout">
            <Button
              as="button"
              className="my-1 block hover:underline"
              onClick={clearUserSession}
            >
              Log Out
            </Button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default LeftMenu;
