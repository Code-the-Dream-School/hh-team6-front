import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import StateCode from 'us-state-codes';

import { getCart, deleteFromCart } from '../../api/DBRequests';
import { useAuth } from '../../context/AuthProvider';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { token, isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart(
          setIsLoading,
          setCartItems,
          setTotal,
          token
        );
        const { cart } = response.data;

        setCartItems(cart.orderItems || []);
        setTotal(cart.total || 0);
      } catch (error) {
        console.error('Error fetching cart:', error.message);
      }
    };

    fetchCart();
  }, [token]);

  const handleDelete = async (itemId) => {
    try {
      await deleteFromCart({}, itemId, token);
      setCartItems((prev) => prev.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  // Group items by seller
  const itemsBySeller = cartItems.reduce((acc, item) => {
    const sellerKey = `${item.sellerName || 'Unknown'}, ${item.sellerLocation || 'Unknown Location'}`;
    if (!acc[sellerKey]) acc[sellerKey] = [];
    acc[sellerKey].push(item);
    return acc;
  }, {});

  return (
    <>
      {isLoggedIn ? (
        <div className="flex min-h-screen flex-col">
          <main className="container mx-auto mt-8 px-4">
            <h1 className="mb-6 font-headings text-2xl font-bold">
              Shopping Cart{' '}
              <span className="font-body font-normal text-blueGray">
                ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})
              </span>
            </h1>

            <div className="mt-6 flex flex-col-reverse gap-4 md:flex-row">
              <section className="flex-1 md:mr-4">
                {Object.keys(itemsBySeller).map((seller, index) => {
                  const [sellerName, city, state] = seller.split(', ');

                  return (
                    <div
                      key={index}
                      className="bg-gray-50 mb-8 rounded-lg border"
                    >
                      <h2 className="text-gray-800 rounded-t-lg border-b border-gray bg-lightBlue p-4 text-lg">
                        <span className="text-blueGray">{sellerName}</span>,{' '}
                        {city}
                        {state
                          ? `, ${StateCode.getStateCodeByStateName(state) || state}`
                          : ''}
                      </h2>
                      {itemsBySeller[seller].map((item) => (
                        <div
                          key={item._id}
                          className="flex flex-col justify-between rounded-lg bg-white p-4 md:flex-row"
                        >
                          <div className="flex">
                            <img
                              src={item.coverImageUrl}
                              alt={item.title}
                              className="h-28 w-20 rounded-md object-cover shadow-sm"
                            />
                            <div className="ml-4 flex flex-col justify-between">
                              <div>
                                <h3 className="text-gray-900 text-lg font-bold hover:underline">
                                  {item.title}
                                </h3>
                                <p className="text-gray-500 text-sm">
                                  {item.author}
                                </p>
                                <div>
                                  <p className="text-gray-800 mt-2 text-lg font-bold md:hidden">
                                    $
                                    {item.price ? item.price.toFixed(2) : 'N/A'}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2 flex gap-2 text-blueGray">
                                <button className="hover:underline">
                                  Save for later
                                </button>
                                <button
                                  onClick={() => handleDelete(item._id)}
                                  className="hover:underline"
                                >
                                  Delete
                                </button>
                                <button className="hover:underline">
                                  Contact seller
                                </button>
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-800 hidden text-lg font-bold md:block">
                              ${item.price ? item.price.toFixed(2) : 'N/A'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </section>

              <div className="w-full self-start rounded-lg border bg-white p-8 md:w-1/4">
                <div className="flex items-center justify-between pb-2">
                  <p className="text-lg font-semibold">Total</p>
                  <p className="text-2xl font-bold">${total.toFixed(2)}</p>
                </div>
                <div className="flex justify-center">
                  <button className="mt-2 w-full items-center rounded-md bg-red px-6 py-1 text-white transition-transform duration-200 hover:bg-redHover active:scale-95">
                    Checkout
                  </button>
                </div>
              </div>
            </div>

            <section className="mt-8">
              <h2 className="text-gray-900 text-lg font-semibold">
                Saved for later
              </h2>
              <p className="text-gray-600 mt-2">
                You don&apos;t have any items saved for later.
              </p>
            </section>

            {cartItems.length === 0 && (
              <p className="text-gray-600 mt-8 text-center">
                Your cart is empty
              </p>
            )}
          </main>
        </div>
      ) : (
        <div className="h-screen w-full">
          <h1 className="text- mt-10 text-center font-body text-2xl">
            Please login to view your cart
          </h1>
          <div className="mt-7 flex justify-center">
            <Link
              className="w-full max-w-xs rounded-md bg-red p-2 text-center font-semibold tracking-wide text-white transition-transform duration-200 hover:bg-redHover active:scale-95"
              to="/sign_in"
            >
              Log In
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
