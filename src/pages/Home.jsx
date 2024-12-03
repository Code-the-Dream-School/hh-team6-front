import React, { useState, useCallback } from 'react';
import Input from '../components/Form/Input';
import { Button } from '@headlessui/react';
import books from '../assets/images/books-home.png';
import booksIcon from '../assets/images/icons/books.png';
import handIcon from '../assets/images/icons/hand.png';
import personIcon from '../assets/images/icons/person-reading.png';

const Home = () => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');

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
      <div className="flex size-full flex-col items-center justify-center gap-8 p-6">
        <img className="h-56 w-64" src={books} alt="books" />
        <form className="flex size-full flex-col bg-lightBlue px-8 py-12">
          <h1 className="mb-6 font-headings text-2xl font-bold">
            Search for books
          </h1>

          <Input
            id="author"
            name="author"
            type="text"
            value={author}
            onChange={handleAuthorChange}
          >
            Author
          </Input>

          <Input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
          >
            Title
          </Input>

          <Input
            id="isbn"
            name="isbn"
            type="text"
            value={isbn}
            onChange={handleIsbnChange}
          >
            ISBN
          </Input>
          <Button
            as="button"
            type="submit"
            className="mt-7 w-full rounded-md bg-darkGreen p-2 font-semibold tracking-wide text-white"
          >
            Search
          </Button>
        </form>
      </div>

      <div>
        <div>
          <div className="flex flex-col items-center justify-center md:flex-row">
            <img alt="books" className="h-24 max-w-24" src={booksIcon} />
            <p>Enrich your bookshelves with new and used books</p>
          </div>
          <div className="flex flex-col items-center justify-center md:flex-row">
            <img alt="hand" className="h-24 max-w-24" src={handIcon} />
            <p>Sell your books and give them a second life</p>
          </div>
          <div className="flex flex-col items-center justify-center md:flex-row">
            <img alt="person" className="h-24 max-w-24" src={personIcon} />
            <p>Shop the books from individual sellers</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
