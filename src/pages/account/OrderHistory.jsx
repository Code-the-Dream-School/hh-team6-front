import React, { useState } from 'react';

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState('purchases');

  const orders = [
    { id: '12345', date: '2024-12-30', total: '$29.99' },
    { id: '67890', date: '2024-12-25', total: '$15.99' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-lightBlue font-body text-black">
      {/* Header */}
      <header className="flex items-center justify-between bg-darkGreen px-4 py-2 text-white">
        <div className="font-headings text-2xl font-bold">Re:Books</div>
        <nav className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="rounded border border-gray px-2 py-1 text-sm"
          />
          <button className="text-blueGray">🔍</button>
          <button className="text-blueGray">🛒</button>
          <button className="rounded bg-darkGreenHover px-4 py-2 text-white hover:bg-darkGreen">
            My Account
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-grow flex-col items-center px-4 py-8">
        {/* Tabs */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setActiveTab('purchases')}
            className={`${
              activeTab === 'purchases'
                ? 'bg-darkGreen text-white'
                : 'bg-gray text-black'
            } rounded px-6 py-2 font-bold hover:bg-darkGreenHover`}
          >
            My Purchases
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`${
              activeTab === 'sales'
                ? 'bg-darkGreen text-white'
                : 'bg-gray text-black'
            } rounded px-6 py-2 font-bold hover:bg-darkGreenHover`}
          >
            My Sales
          </button>
        </div>

        {/* Order Table */}
        <div className="w-full max-w-4xl">
          <table className="w-full border-collapse border border-gray">
            <thead className="bg-gray text-white">
              <tr>
                <th className="border border-gray px-4 py-2 text-left">
                  Order #
                </th>
                <th className="border border-gray px-4 py-2 text-left">
                  Date placed
                </th>
                <th className="border border-gray px-4 py-2 text-left">
                  Total Amount
                </th>
                <th className="border border-gray px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="bg-white hover:bg-grayHover">
                  <td className="border border-gray px-4 py-2">{order.id}</td>
                  <td className="border border-gray px-4 py-2">{order.date}</td>
                  <td className="border border-gray px-4 py-2">
                    {order.total}
                  </td>
                  <td className="border border-gray px-4 py-2">
                    <button className="rounded bg-red px-4 py-2 text-white hover:bg-redHover">
                      View Order
                    </button>
                  </td>
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
