import PropTypes from 'prop-types';

import BookCardLink from './BookCardLink';

const BooksList = ({ list }) => {
  return (
    <div className="container mx-auto">
      <div className="grid justify-items-center gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-5">
        {list.map((book) => (
          <BookCardLink key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

BooksList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.string,
      genre: PropTypes.arrayOf(PropTypes.string), // Updated to accept an array
    })
  ),
  showPrice: PropTypes.bool,
  canEdit: PropTypes.bool,
  canDelete: PropTypes.bool,
  updateList: PropTypes.func,
};

export default BooksList;
