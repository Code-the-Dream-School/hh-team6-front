import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BookCard from './BookCard';

const BookCardLink = ({
  id,
  img,
  title,
  author,
  price,
  canEdit,
  canDelete,
  updateList,
}) => {
  return (
    <Link
      to={`/books/${id}`}
      state={{ img: img, title: title, author: author, price: price }}
    >
      <BookCard
        key={id}
        id={id}
        img={img}
        title={title}
        author={author}
        canEdit={canEdit}
        canDelete={canDelete}
        updateList={updateList}
        price={price}
      />
    </Link>
  );
};

BookCardLink.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  price: PropTypes.number,
  canEdit: PropTypes.bool,
  canDelete: PropTypes.bool,
  updateList: PropTypes.func,
};
export default BookCardLink;
