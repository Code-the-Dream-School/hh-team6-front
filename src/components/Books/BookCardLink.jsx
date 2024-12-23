import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BookCard from './BookCard';

const BookCardLink = ({ book }) => {
  return (
    <Link to={`/books/${book._id}`} state={book}>
      <BookCard
        key={book._id}
        id={book._id}
        title={book.title}
        author={book.author}
        img={book.coverImageUrl}
        price={book.price}
      />
    </Link>
  );
};

BookCardLink.propTypes = {
  book: PropTypes.object.isRequired,
};
export default BookCardLink;
