import { useState, useEffect, useCallback } from 'react';

import { Button } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { useNavigate, createSearchParams } from 'react-router-dom';

import { getBooks } from '../api/DBRequests';
import books from '../assets/images/books-home.png';
import arrowRight from '../assets/images/icons/arrow-right.svg';
import booksIcon from '../assets/images/icons/books.png';
import handIcon from '../assets/images/icons/hand.png';
import personIcon from '../assets/images/icons/person-reading.png';
import BooksLinkList from '../components/Books/BooksLinkList';
import LabelAndInput from '../components/Form/LabelAndInput';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [booksList, setBooksList] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    author: '',
    title: '',
    isbn: '',
  });

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    try {
      await getBooks(setIsLoading, setBooksList, '', {}, 10);
    } catch (error) {
      setError('Failed to load books. Please try again later.');
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const navigate = useNavigate();

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate({
      pathname: 'books',
      search: createSearchParams({
        ...formData,
      }).toString(),
    });
  };

  return (
    <>
      <div className="mt-8 flex w-full flex-col items-center gap-8 px-8 py-6 md:justify-between md:gap-36 md:px-20 lg:flex-row-reverse">
        <img
          className="md:1/3 h-auto w-10/12 lg:w-1/2"
          src={books}
          alt="books"
        />
        <form
          className="flex size-full flex-col bg-lightBlue px-8 py-12 lg:w-1/3"
          onSubmit={handleSubmit}
        >
          <h1 className="mb-6 font-headings text-2xl font-bold">
            Search for books
          </h1>

          <LabelAndInput
            id="author"
            name="author"
            type="text"
            value={formData.author}
            onChange={handleChange}
          >
            Author
          </LabelAndInput>
          <LabelAndInput
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
          >
            Title
          </LabelAndInput>
          <LabelAndInput
            id="isbn"
            name="isbn"
            type="text"
            value={formData.isbn}
            onChange={handleChange}
          >
            ISBN
          </LabelAndInput>
          <Button
            as="button"
            type="submit"
            className="mt-7 w-full rounded-md bg-darkGreen p-2 font-semibold tracking-wide text-white transition-transform duration-150 hover:bg-darkGreenHover active:scale-95"
          >
            Search
          </Button>
        </form>
      </div>

      <div className="flex flex-col px-16 py-8 md:flex-row md:justify-evenly">
        <div className="mb-4 flex flex-col items-center justify-center md:w-56">
          <img alt="books" className="h-24 max-w-24" src={booksIcon} />
          <p className="text-center text-xl">
            Enrich your bookshelves with new and used books
          </p>
        </div>
        <div className="mb-4 flex flex-col items-center justify-center md:w-56">
          <img alt="hand" className="h-24 max-w-24" src={handIcon} />
          <p className="text-center text-xl">
            Sell your books and give them a second life
          </p>
        </div>
        <div className="flex flex-col items-center justify-center md:mb-4 md:w-56">
          <img alt="person" className="h-24 max-w-24" src={personIcon} />
          <p className="text-center text-xl">
            Shop the books from individual sellers
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center pb-16 md:px-16">
        <h1 className="mb-8 font-headings text-xl font-semibold md:self-start">
          Recently added books
        </h1>
        {error ? (
          <p>{error}</p>
        ) : isLoading ? (
          <p>Loading...</p>
        ) : (
          <BooksLinkList list={booksList} />
        )}
      </div>
      <Link to="/books" className="flex gap-4 self-center md:self-start">
        <p className="inline text-xl underline md:pl-20">Shop more books</p>
        <img src={arrowRight} alt="arrow right" />
      </Link>
    </>
  );
};

export default Home;
