import { useState } from 'react';

import { Button, Input } from '@headlessui/react';
import { useNavigate, createSearchParams } from 'react-router-dom';

import searchIcon from '../assets/images/search.svg';

const Search = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleChange = ({ target: { value } }) => {
    setSearch(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate({
      pathname: 'books',
      search: createSearchParams({
        query: search,
      }).toString(),
    });
  };

  return (
    <form
      className="flex h-[35px] w-full rounded-md border border-gray"
      onSubmit={handleSubmit}
    >
      <Input
        name="search"
        placeholder="Enter title, author or ISBN"
        className="m-2 flex-1 focus:border-transparent focus:outline-none"
        value={search}
        onChange={handleChange}
      />
      <Button type="submit">
        <img src={searchIcon} className="h-[33px] w-[33px]" alt="search" />
      </Button>
    </form>
  );
};

export default Search;
