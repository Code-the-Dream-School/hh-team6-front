import React, { useEffect, useState, useMemo } from 'react';
import { useCallback } from 'react';

import { Button } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import StateCode from 'us-state-codes';

import CartItem from './CartItem';
import CartSummary from './CartSummary';
import {
  getCart,
  deleteFromCart,
  getSavedBooks,
  addChat,
} from '../../api/DBRequests';
import BooksList from '../../components/Books/BooksList';
import { useAccount } from '../../context/AccountProvider';
import { useAuth } from '../../context/AuthProvider';
import Preloader from '../../layouts/Preloader';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [savedBooksList, setSavedBooksList] = useState([]);
  const [totals, setTotals] = useState({ tax: 0, shippingFee: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();
  const { setAccountPage, setCurrentChatId } = useAccount();

  const fetchCart = useCallback(async () => {
    setIsLoading(true);
    try {
      await getCart(setCartItems, setTotals, token);
      const fetchedBooks = await getSavedBooks('-addedAt', token);
      setSavedBooksList(fetchedBooks);
    } catch (error) {
      console.error('Error fetching cart:', error.message);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleDelete = async (itemId) => {
    try {
      await deleteFromCart(itemId, token);
      fetchCart();
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };

  const handleContactSeller = async (sellerId) => {
    const chat = await addChat(sellerId, token);
    setAccountPage('messages');
    setCurrentChatId(chat._id);
    navigate('/account');
  };

  const itemsBySeller = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const sellerKey = `${item.sellerName || 'Unknown'}, ${item.sellerLocation || 'Unknown Location'}`;
      if (!acc[sellerKey]) acc[sellerKey] = [];
      acc[sellerKey].push(item);
      return acc;
    }, {});
  }, [cartItems]);

  if (isLoading) {
    return <Preloader />;
  }
  return (
    <div className="flex flex-grow flex-col">
      <main className="container mx-auto mt-8 px-4">
        <h1 className="mb-6 font-headings text-2xl font-bold">
          Shopping Cart{' '}
          <span className="font-body font-normal text-blueGray">
            ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})
          </span>
        </h1>

        {cartItems.length === 0 && (
          <p className="mt-8 text-center">Your cart is empty</p>
        )}

        <div className="mt-6 flex flex-col gap-4 md:flex-row">
          <section className="flex-1 md:mr-4">
            {Object.keys(itemsBySeller).map((seller, index) => {
              const [sellerName, city, state] = seller.split(', ');

              return (
                <div key={index} className="bg-gray-50 mb-8 rounded-lg border">
                  <h2 className="flex justify-between rounded-t-lg border-b border-gray bg-lightBlue p-4 text-lg">
                    <div>
                      <span className="text-blueGray">{sellerName}</span>,{' '}
                      {city}
                      {state
                        ? `, ${StateCode.getStateCodeByStateName(state) || state}`
                        : ''}
                    </div>
                    <div>
                      <Button
                        onClick={() =>
                          handleContactSeller(
                            itemsBySeller[seller][0].book.createdBy._id
                          )
                        }
                        className="text-gray hover:text-black hover:underline"
                      >
                        Contact seller
                      </Button>
                    </div>
                  </h2>
                  {itemsBySeller[seller].map((item) => (
                    <CartItem
                      key={item._id}
                      item={item}
                      handleDelete={handleDelete}
                    />
                  ))}
                </div>
              );
            })}
          </section>

          {cartItems.length > 0 && <CartSummary totals={totals} />}
        </div>

        <section className="mt-8">
          <h2 className="m-3 text-lg font-semibold">Saved for later</h2>
          {savedBooksList.length === 0 ? (
            <p className="mt-2">
              You don&apos;t have any items saved for later.
            </p>
          ) : (
            <BooksList
              list={savedBooksList}
              showListings={true}
              canDeleteSaved={true}
              updateList={fetchCart}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default Cart;
