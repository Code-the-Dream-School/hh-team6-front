import React from 'react';

import { Button } from '@headlessui/react';
import PropTypes from 'prop-types';

import { saveBook } from '../../api/DBRequests';
import { useAuth } from '../../context/AuthProvider';

const CartItem = ({
  item: {
    coverImageUrl,
    title,
    author,
    price,
    book: { isbn10, isbn13 },
    _id,
  },
  handleDelete,
}) => {
  const { token } = useAuth();
  const onSave = () => {
    try {
      saveBook(isbn10, isbn13, token);
      handleDelete(_id);
    } catch (error) {
      console.error('Error saving item:', error.message);
    }
  };

  const onDelete = () => {
    handleDelete(_id);
  };

  return (
    <div className="flex flex-col justify-between rounded-lg bg-white p-4 md:flex-row">
      <div className="flex">
        <img
          src={coverImageUrl}
          alt={title}
          className="h-28 w-20 rounded-md object-cover shadow-sm"
        />
        <div className="ml-4 flex flex-col justify-between">
          <div>
            <h3 className="cursor-pointer text-lg font-bold hover:underline">
              {title}
            </h3>
            <p className="text-sm">{author}</p>
            <div>
              <p className="text-gray-800 mt-2 text-lg font-bold md:hidden">
                ${price ? price.toFixed(2) : 'N/A'}
              </p>
            </div>
          </div>
          <div className="mt-2 flex gap-2 text-blueGray">
            <Button onClick={onSave} className="hover:underline">
              Save for later
            </Button>
            <Button onClick={onDelete} className="hover:underline">
              Delete
            </Button>
          </div>
        </div>
      </div>
      <div>
        <p className="text-gray-800 hidden text-lg font-bold md:block">
          ${price ? price.toFixed(2) : 'N/A'}
        </p>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    coverImageUrl: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    price: PropTypes.number,
    _id: PropTypes.string,
    book: PropTypes.shape({
      isbn10: PropTypes.string,
      isbn13: PropTypes.string,
    }).isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default CartItem;
