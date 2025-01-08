import React, { useState, Fragment, useCallback, useEffect } from 'react';

import { Button, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'
import OrdersTable from '../../components/account/orderHistory/ordersTable';
import { getOrders } from '../../api/DBRequests';
import { useAuth } from '../../context/AuthProvider';
import Preloader from '../../layouts/Preloader';

const OrderHistory = () => {
  const [orders, setOrders] = useState({ buyOrders: [], sellOrders: [] });
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedOrders = await getOrders(token);
      setOrders(fetchedOrders);
    } catch (error) {
      setError('Failed to load orders. Please try again later.');
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <>
      <TabGroup className="p-3">
        <TabList className="mb-4">
          <Tab as={Fragment}>
            {({ hover, selected }) => (
              <Button
                className={clsx(
                  'text-darkGreen focus:outline-none w-1/2 rounded-l-md border border-darkGreen py-1 transition-transform duration-150 sm:w-[150px]',
                  hover && 'bg-darkGreen text-white',
                  selected && 'bg-darkGreen text-white'
                )}
              >
                My Purchases
              </Button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ hover, selected }) => (
              <Button
                className={clsx(
                  'text-darkGreen focus:outline-none w-1/2 rounded-r-md border border-darkGreen py-1 transition-transform duration-150 sm:w-[150px]',
                  hover && 'bg-darkGreen text-white',
                  selected && 'bg-darkGreen text-white'
                )}
              >
                My Sales
              </Button>
            )}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel><OrdersTable orders={orders.buyOrders} variant='purchases'/></TabPanel>
          <TabPanel><OrdersTable orders={orders.sellOrders} variant='sales'/></TabPanel>
        </TabPanels>
      </TabGroup>
      {isLoading && <Preloader />}
    </>
  );
};

export default OrderHistory;
