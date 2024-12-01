import React from 'react';
import Input from '../components/Form/Input';
import { Button } from '@headlessui/react';
import books from '../assets/images/books-home.png';
import booksIcon from '../assets/images/icons/books.png';
import handIcon from '../assets/images/icons/hand.png';
import personIcon from '../assets/images/icons/person-reading.png';

const Home = () => {
  return (
    <>
      <div className="flex size-full flex-col items-center justify-center gap-8 p-6">
        <img className="h-56 w-64" src={books} alt="books" />
        <form className="flex size-full flex-col bg-lightBlue px-8 py-12">
          <h1 className="mb-6 font-headings text-2xl font-bold">
            Search for books
          </h1>

          <label>Author</label>
          <Input />

          <label>Title</label>
          <Input />

          <label>ISBN</label>
          <Input />

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
            <img className="h-24 max-w-24" src={booksIcon} />
            <p>Enrich your bookshelves with new and used books</p>
          </div>
          <div className="flex flex-col items-center justify-center md:flex-row">
            <img className="h-24 max-w-24" src={handIcon} />
            <p>Sell your books and give them a second life</p>
          </div>
          <div className="flex flex-col items-center justify-center md:flex-row">
            <img className="h-24 max-w-24" src={personIcon} />
            <p>Shop the books from individual sellers</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
