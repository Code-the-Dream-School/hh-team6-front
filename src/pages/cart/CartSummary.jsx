import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from '@headlessui/react';

const CartSummary = ({ totals, handleSubmit }) => {
  const { tax, shippingFee, total } = totals;
  const location = useLocation();

  return (
    <div className="w-[300px] rounded-lg border bg-white p-8">
      <div className="flex items-center justify-between pb-2">
        <p className="text-lg font-semibold">Tax</p>
        <p className="text-lg font-bold">${tax.toFixed(2)}</p>
      </div>
      <div className="flex items-center justify-between pb-2">
        <p className="text-lg font-semibold">Shipping Fee</p>
        <p className="text-lg font-bold">${shippingFee.toFixed(2)}</p>
      </div>
      <div className="flex items-center justify-between pb-2">
        <p className="text-lg font-semibold">Total</p>
        <p className="text-2xl font-bold">${total.toFixed(2)}</p>
      </div>
      <div className="flex justify-center">
        { location.pathname === '/cart' ? (
          <Link
            state={ totals}
            to='/check_out'
            className="mt-2 w-full rounded-md bg-red px-6 py-1 text-white hover:bg-redHover text-center"
          >
            Checkout
          </Link>
        ) : (
          <Button
            as="button"
            type="submit"
            onClick={handleSubmit}
            className="mt-2 w-full rounded-md bg-red px-6 py-1 text-white hover:bg-redHover"
          >
            Place Order
          </Button>
        )}
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
