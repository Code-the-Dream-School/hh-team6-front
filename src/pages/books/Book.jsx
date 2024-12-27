import { useState, useEffect } from 'react';

import { Button } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { getBook } from '../../api/DBRequests';
import { useAuth } from '../../context/AuthProvider';

const Book = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoggedIn, userData } = useAuth();
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
  } = bookData;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-5 mt-3 grid justify-items-center gap-4 [grid-template-areas:'header''image''box''table'] md:mt-20 md:grid-cols-[1fr_1fr_1fr] md:grid-rows-[min-content_1fr] md:gap-y-0 md:[grid-template-areas:'image_header_box''image_table_box']">
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
          ${price}
        </h1>
        {isLoggedIn && (
          <>
            <Button
              as="button"
              type="button"
              className="mb-2 mt-4 w-full rounded-md bg-red px-6 py-2 font-body text-xl font-semibold tracking-wide text-white transition-transform duration-150 hover:bg-darkGreenHover active:scale-95"
            >
              Add to cart
            </Button>
            <p>Selling by {`${userData?.firstName} ${userData?.lastName}`}</p>
            <p className="underline">Write to owner</p>
          </>
        )}
      </div>
      <div className="mb-6" style={{ gridArea: 'table' }}>
        <table className="border-separate border-spacing-1.5">
          <tbody>
            {[
              ['Condition', condition],
              ['Author', author],
              ['Publisher', publisher],
              ['Published year', publishedYear],
              ['Genre', genre],
              ['Age category', ageCategory],
              ['Language', language],
              ['Pages', pages],
              ['Cover', coverType],
              ['ISBN', isbn10 ? isbn10 : isbn13],
            ].map(([label, value]) => (
              <tr key={label}>
                <td className="text-body w-28 align-top text-gray">{label}:</td>
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
  );
};

export default Book;
