import React, { useState } from 'react';

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState('purchases');

  const orders = [
    { id: '12345', date: '2024-12-30', total: '$45.99' },
    { id: '67890', date: '2024-12-20', total: '$99.99' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-lightBlue font-body text-black">
      {/* Main Content */}
      <main className="flex flex-grow flex-col px-6 py-8">
        {/* Tabs */}
        <div className="mb-6 flex justify-start">
          <button
            onClick={() => setActiveTab('purchases')}
            className={`${
              activeTab === 'purchases'
                ? 'bg-darkGreen text-white'
                : 'bg-gray-200 text-darkGreen'
            } w-[202px] h-[36px] px-[20px] py-[10px] rounded-md border-2 border-darkGreen transition-transform duration-150 hover:bg-darkGreen hover:text-white active:scale-95`}
          >
            My Purchases
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`${
              activeTab === 'sales'
                ? 'bg-darkGreen text-white'
                : 'bg-gray-200 text-darkGreen'
            } w-[202px] h-[36px] px-[20px] py-[10px] rounded-md border-2 border-darkGreen transition-transform duration-150 hover:bg-darkGreen hover:text-white active:scale-95`}
          >
            My Sales
          </button>
        </div>

        {/* Order Table */}
        <div className="w-full max-w-6xl">
          <table className="w-full border-collapse shadow-lg rounded-lg">
            <thead className="bg-gray-700 text-black">
              <tr>
                <th className="border-b border-gray-300 px-6 py-4 text-left text-sm font-medium">Order #</th>
                <th className="border-b border-gray-300 px-6 py-4 text-left text-sm font-medium">Date placed</th>
                <th className="border-b border-gray-300 px-6 py-4 text-left text-sm font-medium">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="bg-white hover:bg-gray-100">
                  <td className="border-b border-gray-200 px-6 py-4 text-sm">{order.id}</td>
                  <td className="border-b border-gray-200 px-6 py-4 text-sm">{order.date}</td>
                  <td className="border-b border-gray-200 px-6 py-4 text-sm">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default OrderHistory;
