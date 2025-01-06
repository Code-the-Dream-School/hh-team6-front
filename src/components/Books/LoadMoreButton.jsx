import { Button } from '@headlessui/react';
import PropTypes from 'prop-types';

const LoadMoreButton = ({ onClick }) => {
  return (
    <div className="flex justify-center">
      <Button
        onClick={onClick}
        className="rounded-md border border-white px-3 py-1 text-gray hover:border-gray"
      >
        Load More
      </Button>
    </div>
  );
};

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoadMoreButton;
