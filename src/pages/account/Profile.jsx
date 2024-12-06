import React, { useCallback } from 'react';

import { Button } from '@headlessui/react';

import envelopeIcon from '../../assets/images/envelope.png';
import locationIcon from '../../assets/images/location.png';
import userIcon from '../../assets/images/user.png';
import { useAccount } from '../../context/AccountProvider';
import { useAuth } from '../../context/AuthProvider';

const Profile = () => {
  const { userData } = useAuth(); // Access user data
  const { setAccountPage } = useAccount(); // Access account page setter

  // Callback to handle the Edit Profile button click
  const handleEditProfile = useCallback(() => {
    setAccountPage('EditProfile');
  }, [setAccountPage]); // setAccountPage is included as it's defined in context

  return (
    <>
      <h1 className="mb-6 font-headings text-2xl font-bold">
        Personal Profile
      </h1>
      <div className="mb-6 flex items-center">
        <img src={userIcon} alt="User Icon" className="h-6 w-6" />
        <p className="ml-[35px] text-2xl">{`${userData.firstName} ${userData.lastName}`}</p>
      </div>
      <div className="mb-6 flex items-center">
        <img src={envelopeIcon} alt="Envelope Icon" className="h-6 w-6" />
        <p className="ml-[35px] text-2xl">{userData.userEmail}</p>
      </div>
      <div className="mb-6 flex items-center">
        <img src={locationIcon} alt="Location Icon" className="h-6 w-6" />
        <p className="ml-[35px] text-2xl">{userData.location}</p>
      </div>
      <Button
        as="button"
        onClick={handleEditProfile}
        className="w-full rounded bg-yellow px-4 py-2 text-center font-semibold text-white hover:bg-yellowHover sm:w-80"
      >
        Edit Profile
      </Button>
    </>
  );
};

export default Profile;
