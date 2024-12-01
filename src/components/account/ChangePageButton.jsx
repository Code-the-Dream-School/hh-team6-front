import { Button } from '@headlessui/react';
import { useAccount } from '../../context/AccountProvider';
import PropTypes from 'prop-types';

const ChangePageButton = ({ page, label }) => {
  const { accountPage, setAccountPage } = useAccount();

  return (
    <Button
      as="button"
      onClick={() => setAccountPage(page)}
      className={`my-1 block ${accountPage === page ? 'underline' : ''}`}
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
