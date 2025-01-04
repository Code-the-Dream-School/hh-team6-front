import React, { useState } from 'react';

import { Button } from '@headlessui/react';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState('purchases');

  const orders = [
    { id: '1', date: '2025-01-03', total: '67.89' },
    { id: '2', date: '2025-01-02', total: '45.32' },
    { id: '3', date: '2025-01-01', total: '110.45' },
    { id: '4', date: '2024-12-31', total: '78.12' },
    { id: '5', date: '2024-12-30', total: '32.98' },
  ];

  return (
    <div className="flex flex-grow flex-col px-6 py-8">
      <div className="mb-6 flex justify-start">
        <Button
          onClick={() => setActiveTab('purchases')}
          className={`${
            activeTab === 'purchases'
              ? 'bg-darkGreen text-white'
              : 'bg-gray-200 text-darkGreen'
          } w-1/2 rounded-l-md border-2 border-darkGreen py-[6px] transition-transform duration-150 hover:bg-darkGreen hover:text-white md:w-[202px]`}
        >
          My Purchases
        </Button>
        <Button
          onClick={() => setActiveTab('sales')}
          className={`${
            activeTab === 'sales'
              ? 'bg-darkGreen text-white'
              : 'bg-gray-200 text-darkGreen'
          } w-1/2 rounded-r-md border-2 border-darkGreen py-[6px] transition-transform duration-150 hover:bg-darkGreen hover:text-white md:w-[202px]`}
        >
          My Sales
        </Button>
      </div>

      <div className="w-full max-w-4xl rounded-md border border-gray">
        <table className="w-full border-collapse rounded-md bg-white text-center shadow-md">
          <thead className="bg-gray-700 text-black">
            <tr>
              <th className="border-b border-gray py-4 text-xs font-medium md:px-6 md:text-base">
                Order #
              </th>
              <th className="border-b border-gray py-4 text-xs font-medium md:px-6 md:text-base">
                Date placed
              </th>
              <th className="border-b border-gray py-4 text-xs font-medium md:px-6 md:text-base">
                Total Amount
              </th>
              <th className="border-b border-gray py-4 text-xs font-medium md:px-6 md:text-base"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="py-4 text-xs md:px-6 md:text-base">
                  {order.id}
                </td>
                <td className="py-4 text-xs md:px-6 md:text-base">
                  {order.date}
                </td>
                <td className="py-4 text-xs md:px-6 md:text-base">
                  {order.total}
                </td>
                <td className="py-4 text-xs md:px-6 md:text-base">
                  <Link
                    to="/"
                    className="rounded-md bg-darkGreen px-2 py-1 text-xs text-white transition-transform duration-150 hover:bg-darkGreenHover md:px-6 md:text-base"
                  >
                    View Order
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
