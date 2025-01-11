import React from 'react';

import { Button } from '@headlessui/react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const CartSummary = ({ totals: { tax, shippingFee, total } }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full self-start rounded-lg border bg-white p-8 md:w-1/4">
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
        <Button
          onClick={() => navigate('/check_out')}
          className="mt-2 w-full rounded-md bg-red px-6 py-1 text-white hover:bg-redHover"
        >
          Checkout
        </Button>
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
