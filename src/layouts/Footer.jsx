import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-5 flex justify-center bg-lightBlue py-6">
      <Link to="/about">
        <p className="text-sm text-black">
          Created and developed by Team #6 for the CTD Practicum
        </p>
      </Link>
    </footer>
  );
};

export default Footer;
