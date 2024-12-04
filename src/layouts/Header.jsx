import { Link } from 'react-router-dom';

import logoImage from '../assets/images/logo.png';
import NavBar from '../components/header/NavBar';
import Search from '../components/Search';

const Header = () => {
  return (
    <header className="p-5">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="h-[26px] w-[33px] sm:h-[45px] sm:w-[60px]"
            src={logoImage}
            alt="logo"
          />
          <h1 className="font-headings sm:text-2xl sm:font-bold">Re:Books</h1>
        </Link>
        <div className="hidden max-w-[550px] px-5 sm:block sm:flex-auto">
          <Search />
        </div>
        <div>
          <NavBar />
        </div>
      </div>
      <div className="mt-3 sm:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
