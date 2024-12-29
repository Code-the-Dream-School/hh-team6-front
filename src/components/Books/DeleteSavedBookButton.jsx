import { useState } from 'react';

import { Button } from '@headlessui/react';
import PropTypes from 'prop-types';

import { deleteSavedBook } from '../../api/DBRequests';
import deleteImage from '../../assets/images/delete.svg';
import { useAuth } from '../../context/AuthProvider';
import Modal from '../../layouts/ModalDeleteBook';

const DeleteSavedBookButton = ({ id, title, updateList }) => {
  const { token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleButton = () => {
    setIsOpen(true);
  };

  const handleDelete = async () => {
    await deleteSavedBook(id, token);
    setIsOpen(false);
    updateList();
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button as="button" onClick={handleButton}>
        <img alt="Delte saved book" src={deleteImage} />
      </Button>

      <Modal
        isOpen={isOpen}
        onDelete={handleDelete}
        onClose={handleCancel}
        title="Delete Saved book"
        description={`Are you sure you want to delete "${title}" from your saved books?`}
      />
    </>
  );
};

DeleteSavedBookButton.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  updateList: PropTypes.func.isRequired,
};

export default DeleteSavedBookButton;
