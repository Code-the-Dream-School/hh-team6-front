import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import cartImage from '../../assets/images/cart.svg';
import logout from '../../assets/images/logout.svg';
import React from 'react';
import AccountButton from './AccountButton';

const NavBar = () => {
  const { isLoggedIn, clearUserSession } = useAuth();
  const location = useLocation();

  return (
    <>
      {isLoggedIn ? (
        <div className="flex items-center gap-2">
          {location.pathname !== '/cart' && (
            <Link to="/cart" className="flex items-center">
              <img className="rounded border border-gray p-1" src={cartImage} />
            </Link>
          )}

          <AccountButton />

          <button onClick={clearUserSession} className="hidden sm:flex">
            <img
              className="h-[35px] rounded border border-gray p-1"
              src={logout}
            />
          </button>
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
