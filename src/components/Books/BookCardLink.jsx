import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BookCard from './BookCard';

const BookCardLink = ({
  id,
  title,
  author,
  publisher,
  publishedYear,
  pages,
  isbn10,
  isbn13,
  description,
  genre,
  ageCategory,
  condition,
  coverType,
  language,
  price,
  isAvailable,
  img,
  canEdit,
  canDelete,
  updateList,
}) => {
  const bookData = {
    title: title,
    author: author,
    publisher: publisher,
    publishedYear: publishedYear,
    pages: pages,
    isbn10: isbn10,
    isbn13: isbn13,
    description: description,
    genre: genre,
    ageCategory: ageCategory,
    condition: condition,
    coverType: coverType,
    language: language,
    price: price,
    isAvailable: isAvailable,
    img: img,
  };

  return (
    <Link to={`/books/${id}`} state={bookData}>
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
