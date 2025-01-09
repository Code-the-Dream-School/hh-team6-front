import { useState } from 'react';

import { Button } from '@headlessui/react';
import PropTypes from 'prop-types';

import ModalViewOrder from '../../../layouts/ModalViewOrder';
import dateFormater from '../../../utils/dateFormater';

const OrdersTable = ({ orders, variant }) => {
  const headers = ['Order #', 'Date placed', 'Total Amount', ''];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <div className="max-w-4xl rounded-md border border-gray">
        <table className="border-spacing-y-50 w-full text-center">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header} className="border-b border-gray px-2 py-4">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-4">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.orderNumber} className="text-sm md:text-base">
                  <td className="px-2 py-4 text-left">{order.orderNumber}</td>
                  <td className="px-1 py-4">
                    {dateFormater(order.datePlaced)}
                  </td>
                  <td className="px-1 py-4">
                    ${order.total ? order.total.toFixed(2) : ''}
                  </td>
                  <td className="px-1 py-4">
                    <Button
                      onClick={() => handleViewOrder(order)}
                      className="rounded-md bg-darkGreen px-2 py-1 text-white transition-transform duration-150 hover:bg-darkGreenHover"
                    >
                      View Order
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isOpen && selectedOrder && (
        <ModalViewOrder
          order={selectedOrder}
          variant={variant}
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
};

OrdersTable.propTypes = {
  orders: PropTypes.array.isRequired,
  variant: PropTypes.string.isRequired,
};

export default OrdersTable;
