import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { useLocation, Link } from 'react-router-dom';

import AccountLink from './AccountLink';
import accountIcon from '../../assets/images/account.svg';
import { useAuth } from '../../context/AuthProvider';

const AccountButton = () => {
  const location = useLocation();
  const { clearUserSession } = useAuth();

  return (
    <Menu>
      {({ close }) => (
        <>
          {/* Desktop */}
          {location.pathname !== '/account' && (
            <Link
              to="/account"
              className="hidden h-[35px] items-center rounded border border-gray px-1 text-blueGray sm:flex"
            >
              My Account
            </Link>
          )}

          {/* Mobile */}
          <MenuButton className="flex px-1 sm:hidden">
            <img
              className="h-[35px] rounded border border-gray p-1"
              alt="Menu button"
              src={accountIcon}
            />
          </MenuButton>
          <MenuItems
            anchor="bottom end"
            className="mt-1 w-[166px] rounded border border-gray bg-white px-5 py-2 shadow-lg"
          >
            <AccountLink
              page="myBooks"
              label="My Book Listings"
              close={close}
            />
            <AccountLink
              page="orderHistory"
              label="Order History"
              close={close}
            />
            <AccountLink page="savedBooks" label="Saved Books" close={close} />
            <AccountLink page="messages" label="Messages" close={close} />
            <hr className="my-4 border-blueGray" />
            <AccountLink page="profile" label="Profile" close={close} />

            <MenuItem as="div">
              <Button
                as="button"
                className="mb-1 hover:underline"
                onClick={clearUserSession}
              >
                Log Out
              </Button>
            </MenuItem>
          </MenuItems>
        </>
      )}
    </Menu>
  );
};

export default AccountButton;
