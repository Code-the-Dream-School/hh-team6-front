import React from 'react';
import notFoundImage from '../assets/images/404.jpg';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="bg-gray-100 flex flex-grow flex-col items-center justify-center">
      <img
        src={notFoundImage}
        alt="Page not found"
        className="w-full max-w-4xl"
      />
      <Link to="/" className="text-black underline">
        Back to Home Page
      </Link>
    </div>
  );
};

export default NotFound;
