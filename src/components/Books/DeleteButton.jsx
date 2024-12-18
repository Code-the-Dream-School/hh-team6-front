import { useState } from 'react';

import {
  Button,
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from '@headlessui/react';
import PropTypes from 'prop-types';

import { deleteBook } from '../../api/DBRequests';
import { useAuth } from '../../context/AuthProvider';

const DeleteButton = ({ id, title, updateList }) => {
  const { token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleButton = () => {
    setIsOpen(true);
  };

  const handleDelete = async () => {
    await deleteBook(id, token);
    setIsOpen(false);
    updateList();
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        as="button"
        onClick={handleButton}
        className="w-1/2 rounded-md bg-red p-1 font-semibold tracking-wide text-white transition-transform duration-200 hover:bg-redHover active:scale-95"
      >
        Delete
      </Button>

      {isOpen && (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <DialogBackdrop className="fixed inset-0 bg-black/30" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="max-w-sm space-y-4 rounded-md border border-gray bg-white p-5">
              <DialogTitle className="text-center font-bold">
                Delete book
              </DialogTitle>
              <Description>
                {`This will permanently delete ${title}. Are you sure you want to delete this book?`}
              </Description>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={handleCancel}
                  className="w-[100px] rounded-md border border-white px-3 py-1 text-gray hover:border-gray"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
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

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  updateList: PropTypes.func.isRequired,
};

export default DeleteButton;
