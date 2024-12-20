import { Dialog, DialogTitle, Description } from '@headlessui/react';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, title, description, buttonText }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        aria-hidden="true"
      ></div>
      <div className="relative z-20 max-w-lg rounded-lg bg-white p-8 shadow-xl">
        <DialogTitle className="text-center text-xl font-semibold">
          {title}
        </DialogTitle>
        <Description className="mt-4 text-center">{description}</Description>
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full rounded-md bg-darkGreen p-3 text-white hover:bg-darkGreenHover"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </Dialog>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default Modal;
