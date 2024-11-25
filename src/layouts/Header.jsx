import React from 'react';
import logoImage from '../assets/images/logo.png';
import Search from '../components/Search';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleHomeNavigation = () => {
    navigate('/');
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center" onClick={handleHomeNavigation}>
          <img
            className="h-[26px] w-[33px] sm:h-[45px] sm:w-[60px]"
            src={logoImage}
          />
          <h1 className="font-headings sm:text-2xl sm:font-bold">Re:Books</h1>
        </div>
        <div className="hidden max-w-[550px] px-5 sm:block sm:flex-auto">
          <Search id="search" />
        </div>
        <div>
          <NavBar />
        </div>
      </div>
      <div className="mt-3 sm:hidden">
        <Search id="search-mobile" />
      </div>
    </div>
  );
};

export default Header;
