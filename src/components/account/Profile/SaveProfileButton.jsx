import { Button } from '@headlessui/react';
import PropTypes from 'prop-types';

const SaveProfileButton = ({ onClick }) => {
  return (
    <Button
      as="button"
      type="submit"
      onClick={onClick}
      className="mb-2 w-[100px] rounded-md bg-darkGreen px-3 py-1 text-white transition-transform duration-150 hover:bg-darkGreenHover active:scale-95 sm:w-[200px]"
    >
      Save
    </Button>
  );
};

SaveProfileButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SaveProfileButton;
