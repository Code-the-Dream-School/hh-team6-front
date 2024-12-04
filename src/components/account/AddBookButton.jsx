import { useCallback } from 'react';

import { Button } from '@headlessui/react';

import { useAccount } from '../../context/AccountProvider';

const AddBookButton = () => {
  const { setAccountPage } = useAccount();

  const handleAddBook = useCallback(() => {
    setAccountPage('addBook');
  }, [setAccountPage]);

  return (
    <Button
      as="button"
      onClick={handleAddBook}
      className="mb-10 mt-4 block rounded-md bg-darkGreen px-3 py-1 text-white transition-transform duration-150 hover:bg-darkGreenHover active:scale-95"
    >
      + Add New Listing
    </Button>
  );
};

export default AddBookButton;
