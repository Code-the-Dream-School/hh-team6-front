import React from 'react';

import PropTypes from 'prop-types';

const CartSummary = ({ totals }) => {
  return (
    <div className="w-full self-start rounded-lg border bg-white p-8 md:w-1/4">
      <div className="flex items-center justify-between pb-2">
        <p className="text-lg font-semibold">Tax</p>
        <p className="text-lg font-bold">${totals.tax.toFixed(2)}</p>
      </div>
      <div className="flex items-center justify-between pb-2">
        <p className="text-lg font-semibold">Shipping Fee</p>
        <p className="text-lg font-bold">${totals.shippingFee.toFixed(2)}</p>
      </div>
      <div className="flex items-center justify-between pb-2">
        <p className="text-lg font-semibold">Total</p>
        <p className="text-2xl font-bold">${totals.total.toFixed(2)}</p>
      </div>
      <div className="flex justify-center">
        <button className="mt-2 w-full rounded-md bg-red px-6 py-1 text-white hover:bg-redHover">
          Checkout
        </button>
      </div>
    </div>
  );
};
CartSummary.propTypes = {
  totals: PropTypes.shape({
    tax: PropTypes.number.isRequired,
    shippingFee: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartSummary;
