import { useState, useEffect, useCallback } from 'react';

import { getBooks } from '../../api/DBRequests';
import AddBookButton from '../../components/account/AddBookButton';
import BooksList from '../../components/Books/BooksList';
import LoadMoreButton from '../../components/Books/LoadMoreButton';
import LabelAndSelect from '../../components/Form/LabelAndSelect';
import { useAuth } from '../../context/AuthProvider';
import Preloader from '../../layouts/Preloader';
import { sortingOptions } from '../../utils/selectUtils';

const MyBooks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [booksList, setBooksList] = useState([]);
  const [sortBy, setSortBy] = useState('-createdAt');
  const { userId } = useAuth();
  const [error, setError] = useState('');
  const [showLoadMore, setShowLoadMore] = useState(true);

  const BOOKS_LIMIT = 50;

  const fetchBooks = useCallback(
    async (skip = 0) => {
      setIsLoading(true);
      try {
        const fetchedBooks = await getBooks(
          sortBy,
          { userId: userId },
          BOOKS_LIMIT,
          skip
        );

        skip === 0
          ? setBooksList(fetchedBooks)
          : setBooksList((prevBooks) => [...prevBooks, ...fetchedBooks]);

        fetchedBooks.length < BOOKS_LIMIT
          ? setShowLoadMore(false)
          : setShowLoadMore(true);
      } catch (error) {
        setError('Failed to load books. Please try again later.');
      }
      setIsLoading(false);
    },
    [sortBy, userId]
  );

  const handleLoadMoreBooks = () => {
    fetchBooks(booksList.length);
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleSortSelect = (name, value) => {
    setSortBy(value);
  };

  return (
    <>
      <div className="mb-4 flex justify-center gap-1 sm:justify-end">
        <div className="mt-1 h-[42px] w-[141px] sm:hidden">
          <AddBookButton />
        </div>

        <div className="w-[157px]">
          <LabelAndSelect
            id="sortBy"
            name="sortBy"
            value={sortBy}
            data={sortingOptions}
            onChange={handleSortSelect}
          ></LabelAndSelect>
        </div>
      </div>

      {error ? (
        <p>{error}</p>
      ) : isLoading ? (
        <Preloader />
      ) : (
        <>
          <BooksList
            list={booksList}
            canEdit={true}
            canDelete={true}
            updateList={fetchBooks}
          />
          {showLoadMore && <LoadMoreButton onClick={handleLoadMoreBooks} />}
        </>
      )}
    </>
  );
};

export default MyBooks;
