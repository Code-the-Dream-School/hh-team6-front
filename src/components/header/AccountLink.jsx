import { useCallback } from 'react';

import { MenuItem } from '@headlessui/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useAccount } from '../../context/AccountProvider';

const AccountLink = ({ page, label, close }) => {
  const { setAccountPage } = useAccount();

  const handleClick = useCallback(() => {
    setAccountPage(page);
    close();
  }, [page, setAccountPage, close]);

  return (
    <MenuItem as="div" className="mb-1">
      <Link to="/account" onClick={handleClick} className="hover:underline">
        {label}
      </Link>
    </MenuItem>
  );
};

AccountLink.propTypes = {
  page: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default AccountLink;
