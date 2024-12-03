import { useCallback } from 'react';

import { Button } from '@headlessui/react';
import PropTypes from 'prop-types';

import { useAccount } from '../../context/AccountProvider';

const ChangePageButton = ({ page, label }) => {
  const { accountPage, setAccountPage } = useAccount();
  const handleClick = useCallback(() => {
    setAccountPage(page);
  }, [page, setAccountPage]);

  return (
    <Button
      as="button"
      onClick={handleClick}
      className={`my-1 block ${
        accountPage === page ? 'underline' : 'hover:underline'
      }`}
    >
      {label}
    </Button>
  );
};

ChangePageButton.propTypes = {
  page: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default ChangePageButton;
