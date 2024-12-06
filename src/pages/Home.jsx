import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import LabelAndInput from '../components/Form/LabelAndInput';
import { Button } from '@headlessui/react';
import cover from '../assets/images/cover.png';
import books from '../assets/images/books-home.png';
import booksIcon from '../assets/images/icons/books.png';
import handIcon from '../assets/images/icons/hand.png';
import personIcon from '../assets/images/icons/person-reading.png';
import arrowRight from '../assets/images/icons/arrow-right.svg';
import BooksList from '../components/Books/BooksList';

const Home = () => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const booksList = [
    { image: cover, title: 'Karlsson on the Roof', author: 'Astrid Lindren' },
    { image: cover, title: 'Book 2', author: 'Author 2' },
    { image: cover, title: 'Book 3', author: 'Author 3' },
    { image: cover, title: 'Book 4', author: 'Author 4' },
    { image: cover, title: 'Book 5', author: 'Author 5' },
    { image: cover, title: 'Book 6', author: 'Author 6' },
  ];

  const handleAuthorChange = useCallback((event) => {
    setAuthor(event.target.value);
  }, []);

  const handleTitleChange = useCallback((event) => {
    setTitle(event.target.value);
  }, []);

  const handleIsbnChange = useCallback((event) => {
    setIsbn(event.target.value);
  }, []);

  return (
    <>
      <div className="mt-8 flex w-full flex-col items-center gap-8 px-8 py-6 md:justify-between md:gap-36 md:px-20 lg:flex-row-reverse">
        <img
          className="md:1/3 h-auto w-10/12 lg:w-1/2"
          src={books}
          alt="books"
        />
        <form className="flex size-full flex-col bg-lightBlue px-8 py-12 lg:w-1/3">
          <h1 className="mb-6 font-headings text-2xl font-bold">
            Search for books
          </h1>

          <LabelAndInput
            id="author"
            name="author"
            type="text"
            value={author}
            onChange={handleAuthorChange}
          >
            Author
          </LabelAndInput>
          <LabelAndInput
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
          >
            Title
          </LabelAndInput>
          <LabelAndInput
            id="isbn"
            name="isbn"
            type="text"
            value={isbn}
            onChange={handleIsbnChange}
          >
            ISBN
          </LabelAndInput>
          <Button
            as="button"
            type="submit"
            className="hover:bg-darkGreenHover mt-7 w-full rounded-md bg-darkGreen p-2 font-semibold tracking-wide text-white transition-transform duration-150 active:scale-95"
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
        <BooksList list={booksList} />
      </div>
      <Link to="/books" className="flex gap-4 self-center md:self-start">
        <p className="inline text-xl underline md:pl-20">Shop more books</p>
        <img src={arrowRight} alt="arrow right" />
      </Link>
    </>
  );
};

export default Home;
