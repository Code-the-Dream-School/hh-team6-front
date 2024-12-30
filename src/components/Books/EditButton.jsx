import { Button } from '@headlessui/react';
import PropTypes from 'prop-types';

import { useAccount } from '../../context/AccountProvider';

const EditButton = ({ id }) => {
  const { setAccountPage, setCurrentBookId } = useAccount();

  const handleEdit = () => {
    setAccountPage('editBook');
    setCurrentBookId(id);
  };

  return (
    <Button
      as="button"
      onClick={handleEdit}
      className="w-1/2 rounded bg-yellow p-1 text-center font-semibold text-white hover:bg-yellowHover"
    >
      Edit
    </Button>
  );
};

EditButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default EditButton;
