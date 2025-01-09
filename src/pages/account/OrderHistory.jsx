import React, { useState, Fragment, useCallback, useEffect } from 'react';

import {
  Button,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react';
import clsx from 'clsx';

import { getOrders } from '../../api/DBRequests';
import OrdersTable from '../../components/account/orderHistory/OrdersTable';
import { useAuth } from '../../context/AuthProvider';
import Preloader from '../../layouts/Preloader';

const OrderHistory = () => {
  const [orders, setOrders] = useState({ buyOrders: [], sellOrders: [] });
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const [error, setError] = useState('');

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedOrders = await getOrders(token);
      setOrders(fetchedOrders);
    } catch (error) {
      setError('Failed to load orders. Please try again later.');
    }
    setIsLoading(false);
  }, [token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <TabGroup className="p-3">
            <TabList className="mb-4">
              <Tab as={Fragment}>
                {({ hover, selected }) => (
                  <Button
                    className={clsx(
                      'w-1/2 rounded-l-md border border-darkGreen py-1 text-darkGreen transition-transform duration-150 focus:outline-none sm:w-[150px]',
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
                      'w-1/2 rounded-r-md border border-darkGreen py-1 text-darkGreen transition-transform duration-150 focus:outline-none sm:w-[150px]',
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
              <TabPanel>
                <OrdersTable orders={orders.buyOrders} variant="purchases" />
              </TabPanel>
              <TabPanel>
                <OrdersTable orders={orders.sellOrders} variant="sales" />
              </TabPanel>
            </TabPanels>
          </TabGroup>
          {isLoading && <Preloader />}
        </>
      )}
    </>
  );
};

export default OrderHistory;
