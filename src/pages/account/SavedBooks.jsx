import { useState, useEffect, useCallback } from 'react';

import { getSavedBooks } from '../../api/DBRequests';
import BooksList from '../../components/Books/BooksList';
import LabelAndSelect from '../../components/Form/LabelAndSelect';
import { useAuth } from '../../context/AuthProvider';
import { sortingSavedBooks } from '../../utils/selectUtils';

const MyBooks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [booksList, setBooksList] = useState([]);
  const [sortBy, setSortBy] = useState('-addedAt');
  const { token } = useAuth();
  const [error, setError] = useState('');

  const fetchBooks = useCallback(async () => {
    try {
      const fetchedBooks = await getSavedBooks(setIsLoading, sortBy, token);
      setBooksList(fetchedBooks);
    } catch (error) {
      setError('Failed to load books. Please try again later.');
    }
  }, [sortBy, token]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleSortSelect = (name, value) => {
    setSortBy(value);
  };

  return (
    <>
      <div className="mb-4 flex justify-center gap-1 sm:justify-end">
        <div className="w-[157px]">
          <LabelAndSelect
            id="sortBy"
            name="sortBy"
            value={sortBy}
            data={sortingSavedBooks}
            onChange={handleSortSelect}
          ></LabelAndSelect>
        </div>
      </div>

      {error ? (
        <p>{error}</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <BooksList
            list={booksList}
            isSavedBooks={true}
            updateList={fetchBooks}
          />
        </>
      )}
    </>
  );
};

export default MyBooks;
