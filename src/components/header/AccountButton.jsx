import accountIcon from '../../assets/images/account.svg';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { useLocation, Link } from 'react-router-dom';
import { useAccount } from '../../context/AccountProvider';
import { useAuth } from '../../context/AuthProvider';

const AccountButton = () => {
  const { setAccountPage } = useAccount();
  const location = useLocation();
  const { clearUserSession } = useAuth();

  const moveToAccountPage = (accountPage, close) => {
    setAccountPage(accountPage);
    close();
  };

  const menuLink = (page, label, close) => {
    return (
      <MenuItem as="div" className="mb-1">
        <Link
          to="/account"
          onClick={() => moveToAccountPage(page, close)}
          className="hover:underline"
        >
          {label}
        </Link>
      </MenuItem>
    );
  };

  return (
    <>
      <Menu>
        {({ close }) => (
          <>
            {location.pathname !== '/account' && (
              <>
                <Link
                  to="/account"
                  className="hidden h-[35px] items-center rounded border border-gray px-1 text-blueGray sm:flex"
                >
                  My Account
                </Link>
              </>
            )}
            <MenuButton className="flex px-1 sm:hidden">
              <img
                className="h-[35px] rounded border border-gray p-1"
                src={accountIcon}
              />
            </MenuButton>
            <MenuItems
              anchor="bottom end"
              className="mt-1 w-[166px] rounded border border-gray bg-white px-5 py-2 shadow-lg"
            >
              {menuLink('myBooks', 'My Book Listings', close)}
              {menuLink('orderHistory', 'Order History', close)}
              {menuLink('savedBooks', 'Saved books', close)}
              {menuLink('messages', 'Messages', close)}
              <hr className="my-4 border-blueGray" />
              {menuLink('profile', 'Profile', close)}

              <MenuItem as="div">
                <Button
                  as="button"
                  className="mb-1 hover:underline"
                  onClick={() => {
                    clearUserSession();
                  }}
                >
                  Log Out
                </Button>
              </MenuItem>
            </MenuItems>
          </>
        )}
      </Menu>
    </>
  );
};

export default AccountButton;
