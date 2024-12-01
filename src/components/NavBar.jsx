import { Button } from '@headlessui/react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import cartImage from '../assets/images/cart.svg';
import logout from '../assets/images/logout.svg';

const NavBar = () => {
  const { isLoggedIn, clearUserSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    clearUserSession();
    navigate('/');
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="flex items-center gap-2">
          {location.pathname !== '/cart' && (
            <Link to="/cart" className="flex items-center">
              <img
                className="rounded border border-gray p-1"
                alt="cart"
                src={cartImage}
              />
            </Link>
          )}
          {location.pathname !== '/account' && (
            <Link
              to="/account"
              className="flex h-[35px] items-center rounded border border-gray px-1 text-blueGray"
            >
              My Account
            </Link>
          )}
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <Button as="button" onClick={handleLogout}>
            <img
              className="h-[35px] rounded border border-gray p-1"
              alt="logout"
              src={logout}
            />
          </Button>
        </div>
      ) : (
        <>
          {location.pathname !== '/sign_in' && (
            <Link to="/sign_in" className="mx-1 text-blueGray">
              Log In
            </Link>
          )}
          {location.pathname !== '/sign_up' && (
            <Link
              to="/sign_up"
              className="mx-1 rounded border border-gray p-1 px-1 text-blueGray"
            >
              Sign Up
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default NavBar;
