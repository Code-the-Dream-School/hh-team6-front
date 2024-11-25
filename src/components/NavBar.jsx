import { Button } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import cartImage from '../assets/images/cart.png';
import logout from '../assets/images/logout.png';
import { useLocation } from 'react-router-dom';

const NavBar = () => {
  const { isLoggedIn, clearUserSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (link) => {
    navigate(link);
  };

  const handleLogout = () => {
    clearUserSession();
    navigate('/');
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="flex items-center gap-2">
          {location.pathname !== '/cart' && (
            <Button as="button" onClick={() => handleNavigation('/cart')}>
              <img className="rounded border border-gray p-1" src={cartImage} />
            </Button>
          )}
          {location.pathname !== '/account' && (
            <Button
              as="button"
              onClick={() => handleNavigation('/account')}
              className="h-[35px] rounded border border-gray px-1 text-blueGray"
            >
              My Account
            </Button>
          )}
          <Button as="button" onClick={handleLogout}>
            <img
              className="h-[35px] rounded border border-gray p-1"
              src={logout}
            />
          </Button>
        </div>
      ) : (
        <>
          {location.pathname !== '/sign_in' && (
            <Button
              as="button"
              onClick={() => handleNavigation('/sign_in')}
              className="mx-1 text-blueGray"
            >
              Log In
            </Button>
          )}
          {location.pathname !== '/sign_up' && (
            <Button
              as="button"
              onClick={() => handleNavigation('/sign_up')}
              className="mx-1 rounded border border-gray px-1 text-blueGray"
            >
              Sign Up
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default NavBar;
