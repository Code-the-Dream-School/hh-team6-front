import {
  Dialog,
  DialogTitle,
  Description,
  Button,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onDelete, onClose, title, description }) => {
  return (
    <>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose}>
          <DialogBackdrop className="fixed inset-0 bg-black/30" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="max-w-sm space-y-4 rounded-md border border-gray bg-white p-5">
              <DialogTitle className="text-center font-bold">
                {title}
              </DialogTitle>
              <Description>{description}</Description>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={onClose}
                  className="w-[100px] rounded-md border border-white px-3 py-1 text-gray hover:border-gray"
                >
                  Cancel
                </Button>
                <Button
                  onClick={onDelete}
                  className="w-[100px] rounded-md bg-red px-3 py-1 font-semibold tracking-wide text-white hover:bg-redHover"
                >
                  Delete
                </Button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Modal;
