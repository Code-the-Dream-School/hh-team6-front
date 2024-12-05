import { useCallback } from 'react';

import { Button } from '@headlessui/react';

import { useAccount } from '../../../context/AccountProvider';

const CancelButton = () => {
  const { setAccountPage } = useAccount();

  const handleCancel = useCallback(() => {
    setAccountPage('myBooks');
  }, [setAccountPage]);

  return (
    <Button
      as="button"
      type="button"
      onClick={handleCancel}
      className="mb-2 w-[200px] rounded-md border border-yellow px-3 py-1 text-yellow transition-transform duration-150 hover:bg-yellow hover:text-white active:scale-95"
    >
      Cancel
    </Button>
  );
};

export default CancelButton;
