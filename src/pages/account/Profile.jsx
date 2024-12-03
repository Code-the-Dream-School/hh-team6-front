import React from 'react';
import userIcon from '../../assets/images/user.png';
import locationIcon from '../../assets/images/location.png';
import envelopeIcon from '../../assets/images/envelope.png';

const Profile = () => {
  return (
    <div className="mx-auto max-w-sm text-left font-sans">
      <h1 className="mb-6 text-xl font-bold">Personal Profile</h1>
      <div className="mb-4 flex items-center">
        <img
          src={userIcon}
          alt="User Icon"
          className="text-gray-500 mr-3 h-6 w-6"
        />
        <span className="text-base">John Doe</span>
      </div>
      <div className="mb-4 flex items-center">
        <img
          src={envelopeIcon}
          alt="Envelope Icon"
          className="text-gray-500 mr-3 h-6 w-6"
        />
        <span className="text-base">john-doe@mail.com</span>
      </div>
      <div className="mb-6 flex items-center">
        <img
          src={locationIcon}
          alt="Location Icon"
          className="text-gray-500 mr-3 h-6 w-6"
        />
        <span className="text-base">San Diego, CA</span>
      </div>
      <button className="w-full rounded bg-orange-500 px-4 py-2 text-center font-semibold text-white hover:bg-orange-600">
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
