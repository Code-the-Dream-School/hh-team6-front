import { useEffect, useState, useCallback } from 'react';

import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { useSearchParams } from 'react-router-dom';

import { getBooks } from '../../api/DBRequests';
import BooksList from '../../components/Books/BooksList';
import LeftMenu from '../../components/Books/LeftMenu';
import LoadMoreButton from '../../components/Books/LoadMoreButton';
import Filters from '../../components/Filters';
import LabelAndSelect from '../../components/Form/LabelAndSelect';
import Preloader from '../../layouts/Preloader';
import { sortingOptions } from '../../utils/selectUtils';

const BOOKS_LIMIT = 50;

const Books = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [booksList, setBooksList] = useState([]);
  const [sortBy, setSortBy] = useState('-createdAt');
  const [filterCount, setFilterCount] = useState(0);
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');
  const [showLoadMore, setShowLoadMore] = useState(true);

  const [filters, setFilters] = useState({
    ageCategory: [],
    condition: [],
    coverType: [],
    genre: [],
    isAvailable: true,
  });

  const fetchBooks = useCallback(
    async (skip = 0) => {
      setIsLoading(true);

      try {
        const fetchedBooks = await getBooks(
          sortBy,
          {
            ...filters,
            ...Object.fromEntries([...searchParams]),
          },
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
    [filters, searchParams, sortBy]
  );

  const handleLoadMoreBooks = () => {
    fetchBooks(booksList.length);
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    const count = Object.keys(filters).filter(
      (key) => filters[key].length > 0
    ).length;
    setFilterCount(count);
  }, [filters]);

  const handleSortSelect = (name, value) => {
    setSortBy(value);
  };

  return (
    <>
      <div className="sm:flex sm:flex-grow">
        {/* desktop menu */}
        <LeftMenu
          sortBy={sortBy}
          handleSortSelect={handleSortSelect}
          filters={filters}
          setFilters={setFilters}
        />

        {/* mobile sort and filters */}
        <div className="items-top mx-5 flex gap-2 sm:hidden">
          {/* sorting */}
          <div className="mt-3">Sort: </div>
          <div className="flex-grow">
            <LabelAndSelect
              id="sortBy"
              name="sortBy"
              value={sortBy}
              data={sortingOptions}
              onChange={handleSortSelect}
            ></LabelAndSelect>
          </div>

          {/* filters */}
          <Menu>
            <MenuButton className="mt-1 flex h-[42px] w-[100px] items-center justify-center rounded border border-gray px-1 text-gray sm:hidden">
              Filters {filterCount > 0 && `(${filterCount})`}
            </MenuButton>
            <MenuItems
              anchor="bottom end"
              className="mt-1 rounded bg-white py-2"
            >
              <Filters filters={filters} setFilters={setFilters} />
            </MenuItems>
          </Menu>
        </div>

        <div className="px-5 sm:flex-1">
          {error ? (
            <p>{error}</p>
          ) : isLoading ? (
            <Preloader />
          ) : (
            <>
              <BooksList list={booksList} showPrice={true} isLinkList={true} />
              {showLoadMore && <LoadMoreButton onClick={handleLoadMoreBooks} />}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Books;
