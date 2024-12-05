import React from 'react';

import envelopeIcon from '../../assets/images/envelope.png';
import locationIcon from '../../assets/images/location.png';
import userIcon from '../../assets/images/user.png';

const Profile = () => {
  return (
    <div className>
      <></>
      <h1 className="mb-6 font-headings text-2xl font-bold">
        Personal Profile
      </h1>
      <div className="mb-6 flex items-center">
        <img src={userIcon} alt="User Icon" className="h-6 w-6" />
        <p className="ml-[35px] text-2xl">John Doe</p>
      </div>
      <div className="mb-6 flex items-center">
        <img src={envelopeIcon} alt="Envelope Icon" className="h-6 w-6" />
        <p className="ml-[35px] text-2xl">john-doe@mail.com</p>
      </div>
      <div className="mb-6 flex items-center">
        <img
          src={locationIcon}
          alt="Location Icon"
          className="h-6 w-6"
        />
        <p className="ml-[35px] text-2xl">San Diego, CA</p>
      </div>
      <button className="w-full rounded bg-yellow px-4 py-2 text-center font-semibold text-white hover:bg-yellowHover sm:w-80">
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
