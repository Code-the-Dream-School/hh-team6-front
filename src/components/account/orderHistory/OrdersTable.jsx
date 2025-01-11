import { useState } from 'react';

import PropTypes from 'prop-types';

import ModalViewOrder from '../../../layouts/ModalViewOrder';
import dateFormater from '../../../utils/dateFormater';

import { Button, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

const OrdersTable = ({ orders, variant, updateOrder }) => {
  const tableHeaders = ['Order #', 'Date placed', 'Status', 'Total Amount', ''];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewOrder = (order, close) => {
    setSelectedOrder(order);
    close();
    setIsOpen(true);
  };

  const handleUpdateOrderStatus = async (orderId, status, close) => {
    close();
    await updateOrder(orderId, status);
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
              {tableHeaders.map((header) => (
                <th key={header} className="border-b border-gray px-1 py-4">
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
                    {order.status}
                  </td>
                  <td className="px-1 py-4">
                    ${order.total ? order.total.toFixed(2) : ''}
                  </td>
                  <td className="px-1 py-4">
                    <Menu>
                      {({ close }) => (
                        <>
                          <MenuButton className="text-gray border rounded-md px-2 py-1">
                            &#9776;
                          </MenuButton>
                          <MenuItems
                            anchor="bottom end"
                            modal={false}
                            className="rounded bg-white p-2 border border-gray mt-1"
                          >
                            <MenuItem as="div" className="mb-1">
                              <Button onClick={() => handleViewOrder(order, close)} className="hover:underline">
                                View order
                              </Button>
                            </MenuItem>
                            { order.status === 'Pending' && (
                              <MenuItem as="div" className="mb-1">
                                <Button onClick={() => handleUpdateOrderStatus(order._id, 'Cancelled', close)} className="hover:underline">
                                  Cancel order
                                </Button>
                              </MenuItem>
                            )}
                            { order.status === 'Pending' && variant === 'sales' && (
                              <MenuItem as="div" className="mb-1">
                                <Button onClick={() => handleUpdateOrderStatus(order._id, 'Confirmed', close)} className="hover:underline">
                                  Confirm order
                                </Button>
                              </MenuItem>
                            )}
                            { order.status === 'Confirmed' && variant === 'sales' && (
                              <MenuItem as="div" className="mb-1">
                                <Button onClick={() => handleUpdateOrderStatus(order._id, 'Shipped', close)} className="hover:underline">
                                  Order shipped
                                </Button>
                              </MenuItem>
                            )}
                            { order.status === 'Shipped' && variant === 'purchases' && (
                              <MenuItem as="div" className="mb-1">
                                <Button onClick={() => handleUpdateOrderStatus(order._id, 'Delivered', close)} className="hover:underline">
                                  Order delivered
                                </Button>
                              </MenuItem>
                            )}
                          
                          </MenuItems>
                        </>
                      )}
                    </Menu>
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
