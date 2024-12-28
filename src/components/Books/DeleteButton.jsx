import { useState } from 'react';

import { Button } from '@headlessui/react';
import PropTypes from 'prop-types';

import { deleteBook } from '../../api/DBRequests';
import { useAuth } from '../../context/AuthProvider';
import Modal from '../../layouts/ModalDeleteBook';

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

      <Modal
        isOpen={isOpen}
        onDelete={handleDelete}
        onClose={handleCancel}
        title="Delete book"
        description={`This will permanently delete ${title}. Are you sure you want to delete this book?`}
      />
    </>
  );
};

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  updateList: PropTypes.func.isRequired,
};

export default DeleteButton;
