import React from 'react';

import PropTypes from 'prop-types';

const CartItem = ({ item, handleDelete }) => {
  return (
    <div className="flex flex-col justify-between rounded-lg bg-white p-4 md:flex-row">
      <div className="flex">
        <img
          src={item.coverImageUrl}
          alt={item.title}
          className="h-28 w-20 rounded-md object-cover shadow-sm"
        />
        <div className="ml-4 flex flex-col justify-between">
          <div>
            <h3 className="cursor-pointer text-lg font-bold hover:underline">
              {item.title}
            </h3>
            <p className="text-sm">{item.author}</p>
            <div>
              <p className="text-gray-800 mt-2 text-lg font-bold md:hidden">
                ${item.price ? item.price.toFixed(2) : 'N/A'}
              </p>
            </div>
          </div>
          <div className="mt-2 flex gap-2 text-blueGray">
            <button className="hover:underline">Save for later</button>
            <button
              onClick={() => handleDelete(item._id)}
              className="hover:underline"
            >
              Delete
            </button>
            <button className="hover:underline">Contact seller</button>
          </div>
        </div>
      </div>
      <div>
        <p className="text-gray-800 hidden text-lg font-bold md:block">
          ${item.price ? item.price.toFixed(2) : 'N/A'}
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
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default CartItem;
