import { useCallback } from 'react';

import { Button } from '@headlessui/react';

import { useAccount } from '../../context/AccountProvider';

const EditProfileButton = () => {
  const { setAccountPage } = useAccount();

  const handleEditProfile = useCallback(() => {
    setAccountPage('Edit Profile');
  }, [setAccountPage]);

  return (
    <Button
      as="button"
      onClick={handleEditProfile}
      className="w-full rounded bg-yellow px-4 py-2 text-center font-semibold text-white hover:bg-yellowHover sm:w-80"
    >
      Edit Profile
    </Button>
  );
};

export default EditProfileButton;
