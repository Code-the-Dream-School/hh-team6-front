import { useState, useEffect } from 'react';

import { Button } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { getBook, addToCart } from '../../api/DBRequests';
import { addChat } from '../../api/DBRequests';
import { useAccount } from '../../context/AccountProvider';
import { useAuth } from '../../context/AuthProvider';
import Preloader from '../../layouts/Preloader';

const Book = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoggedIn, token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [bookData, setBookData] = useState(location.state || {});

  useEffect(() => {
    const fetchData = async () => {
      if (!location.state) {
        try {
          setIsLoading(true);
          const fetchedBookData = await getBook(id, setIsLoading);
          setBookData(fetchedBookData);
        } catch (error) {
          if (error.status === 404) {
            navigate('/404');
          }
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [id, location.state, navigate]);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate('/sign_in');
      return;
    }
    const headers = { 'Content-Type': 'application/json' };
    try {
      await addToCart(
        { headers },
        { bookId: id, price: bookData.price },
        token
      );
      navigate('/cart');
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      console.error(
        'Error adding to cart:',
        error.response?.data || error.message
      );
      alert(`Error adding to cart: ${errorMessage}`);
    }
  };

  const {
    title,
    coverImageUrl,
    price,
    condition,
    author,
    publisher,
    publishedYear,
    genre,
    ageCategory,
    language,
    pages,
    coverType,
    isbn10,
    isbn13,
    description,
    createdBy,
  } = bookData;

  const { setAccountPage, setCurrentChatId } = useAccount();

  const handleWriteToOwner = async () => {
    setIsLoading(true);
    const chat = await addChat(createdBy._id, token);
    setIsLoading(false);
    setAccountPage('messages');
    setCurrentChatId(chat._id);
    navigate('/account');
  };

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="mx-5 mt-3 grid flex-grow justify-items-center gap-4 text-center [grid-template-areas:'header''image''box''table'] md:mt-20 md:grid-cols-[1fr_1fr_1fr] md:grid-rows-[min-content_1fr] md:gap-y-0 md:text-start md:[grid-template-areas:'image_header_box''image_table_box']">
          <h1
            className="w-full font-headings text-2xl font-bold"
            style={{ gridArea: 'header' }}
          >
            {title}
          </h1>
          <img
            className="h-auto w-60"
            style={{ gridArea: 'image' }}
            alt={`${title}`}
            src={coverImageUrl}
          />
          <div
            className="my-2 flex h-max w-full max-w-[18rem] flex-col items-center rounded-md border border-gray px-8 py-5"
            style={{ gridArea: 'box' }}
          >
            <h1 className="col-span-full text-center font-headings text-2xl font-bold md:text-left">
              ${price ? price.toFixed(2) : 'N/A'}
            </h1>
            {isLoggedIn && (
              <>
                <Button
                  as="button"
                  onClick={handleAddToCart}
                  className="mt-4 rounded-md bg-red px-6 py-2 text-white hover:bg-redHover"
                >
                  Add to cart
                </Button>
                <p>
                  Selling by{' '}
                  {`${bookData.createdBy.firstName} ${bookData.createdBy.lastName}`}
                </p>
                <Button
                  onClick={handleWriteToOwner}
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  Write to owner
                </Button>
              </>
            )}
          </div>
          <div className="mb-6" style={{ gridArea: 'table' }}>
            <table className="border-separate border-spacing-1.5">
              <tbody>
                {[
                  ['Condition', condition],
                  ['Author', author],
                  ['Publisher', publisher + ` (${publishedYear})`],
                  ['Genre', genre],
                  ['Age category', ageCategory],
                  ['Language', language],
                  ['Pages', pages],
                  ['Cover', coverType],
                  ['ISBN', isbn10 ? isbn10 : isbn13],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td className="text-body w-28 align-top text-gray">
                      {label}:
                    </td>
                    <td className="align-top">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <p className="text-body mt-3 text-gray">Description:</p>
              <p>{description}</p>
            </div>
          </div>
        </div>
      )}
      ;
    </>
  );
};

export default Book;
