import searchIcon from '../assets/images/search.svg';
import PropTypes from 'prop-types';
import { Button, Input } from '@headlessui/react';

const Search = ({ id }) => {
  return (
    <form className="flex h-[35px] w-full rounded-md border border-gray">
      <Input
        id={id}
        name="search"
        placeholder="Enter title, author or ISBN"
        className="m-2 flex-1 focus:border-transparent focus:outline-none"
      />
      <Button type="submit">
        <img src={searchIcon} className="h-[33px] w-[33px]" alt="search" />
      </Button>
    </form>
  );
};

Search.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Search;
