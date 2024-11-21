import searchIcon from '../assets/images/search.png';
import PropTypes from 'prop-types';

const Search = ({ id }) => {
  return (
    <form className="flex h-[35px] w-full rounded-md border border-gray">
      <input
        id={id}
        name="search"
        placeholder="Enter title, author or ISBN"
        className="m-2 flex-1 focus:border-transparent focus:outline-none"
      />
      <button type="submit">
        <img src={searchIcon} className="h-[33px] w-[33px]" />
      </button>
    </form>
  );
};

Search.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Search;
