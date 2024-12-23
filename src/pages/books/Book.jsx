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
  const [bookData, setBookData] = useState({});
  console.log('Book data:', bookData);

  useEffect(() => {
    async function fetchData() {
      if (!location.state) {
        try {
          setIsLoading(true);
          const bookData = await getBook(id, setIsLoading);
          setBookData(bookData);
          console.log('Book data inside try:', bookData);
        } catch (error) {
          if (error.status === 404) {
            navigate('/404');
          } else {
            console.error('Error fetching book data:', error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchData();
  }, [id, location.state, navigate]);

  return (
    <div className="grid-template-areas mx-5 justify-items-center">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <h1 className="grid-area-header w-full font-headings text-2xl font-bold">
          {location.state?.title ? location.state.title : bookData.title}
        </h1>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <img
          className="grid-area-image h-auto w-60"
          alt="cover"
          src={
            location.state?.img ? location.state.img : bookData.coverImageUrl
          }
        ></img>
      )}
      <div className="grid-area-box my-2 flex flex-col items-center rounded-md border border-gray px-8 py-5">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <h1 className="font-headings text-2xl">
            ${location.state?.price ? location.state.price : bookData.price}
          </h1>
        )}
        {isLoggedIn ? (
          <>
            <Button
              as="button"
              type="submit"
              className="mb-2 mt-4 w-full rounded-md bg-red px-6 py-2 font-body text-xl font-semibold tracking-wide text-white transition-transform duration-150 hover:bg-darkGreenHover active:scale-95"
            >
              Add to cart
            </Button>
            <p>Selling by {`${userData.firstName} ${userData.lastName}`}</p>
            <p className="underline">Write to owner</p>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="grid-area-table mb-6">
        <table className="border-spacing-1.5">
          <tbody>
            <tr>
              <td className="text-body w-28 text-gray">Condition:</td>
              <td>{bookData.condition}</td>
            </tr>
            <tr>
              <td className="text-body align-top text-gray">Author:</td>
              <td className="align-top">{bookData.author}</td>
            </tr>
            <tr>
              <td className="text-body align-top text-gray">Publisher:</td>
              <td className="align-top">{bookData.publisher}</td>
            </tr>
            <tr>
              <td className="text-body align-top text-gray">Genre:</td>
              <td className="align-top">{bookData.genre}</td>
            </tr>
            <tr>
              <td className="text-body align-top text-gray">Age category:</td>
              <td className="align-top">{bookData.ageCategory}</td>
            </tr>
            <tr>
              <td className="text-body align-top text-gray">Language:</td>
              <td className="align-top">{bookData.language}</td>
            </tr>
            <tr>
              <td className="text-body align-top text-gray">Pages:</td>
              <td className="align-top">{bookData.pages}</td>
            </tr>
            <tr>
              <td className="text-body align-top text-gray">Cover:</td>
              <td className="align-top">{bookData.coverType}</td>
            </tr>
            <tr>
              <td className="text-body align-top text-gray">ISBN:</td>
              <td className="align-top">{bookData.isbn10}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <p className="text-body mt-3 text-gray">Description:</p>
          <p>{bookData.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Book;
