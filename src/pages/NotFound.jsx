import React from 'react';
import notFoundImage from '../assets/images/404.jpg';

const NotFound = () => {
  return (
    <div className="bg-gray-100 flex h-screen flex-col items-center justify-center">
      <img
        src={notFoundImage}
        alt="Page not found"
        className="w-full max-w-4xl"
      />
      <a href="/" className="text-black underline">
        Back to Home Page
      </a>
    </div>
  );
};

export default NotFound;
