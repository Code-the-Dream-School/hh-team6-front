import { useState, useEffect, useCallback } from 'react';

import { getBooks } from '../../api/DBRequests';
import AddBookButton from '../../components/account/AddBookButton';
import BooksList from '../../components/Books/BooksList';
import LabelAndSelect from '../../components/Form/LabelAndSelect';
import { useAuth } from '../../context/AuthProvider';
import { sortingOptions } from '../../utils/selectUtils';

const MyBooks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [booksList, setBooksList] = useState([]);
  const [sortBy, setSortBy] = useState('-createdAt');
  const { userId } = useAuth();

  const updateList = useCallback(async () => {
    setIsLoading(true);
    await getBooks(setIsLoading, setBooksList, sortBy, { userId: userId });
  }, [sortBy, userId]);

  useEffect(() => {
    updateList();
  }, [updateList]);

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

      {isLoading && 'loading'}
      {!isLoading && (
        <BooksList
          list={booksList}
          canEdit={true}
          canDelete={true}
          updateList={updateList}
        />
      )}
    </>
  );
};

export default MyBooks;
