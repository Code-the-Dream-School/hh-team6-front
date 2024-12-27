import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

const BookCard = ({ book, canEdit, canDelete, updateList, isLink = false }) => {
  const { _id: id, title, coverImageUrl, price, author } = book;
  const cardContent = (
    <div className="flex w-52 max-w-52 flex-col items-center rounded bg-lightBlue p-4 lg:w-40 xl:w-52">
      <img
        className="h-48 w-32 object-cover"
        src={coverImageUrl}
        alt={`Cover of ${title}`}
      />
      <div className="flex h-full w-full flex-col pt-4 text-center">
        <div className="flex-1">
          <h2 className="mb-2 line-clamp-1 text-lg font-bold" title={title}>
            {title}
          </h2>
          <p
            className="text-gray-700 mb-2 line-clamp-1 text-sm"
            title={`by ${author}`}
          >
            by {author}
          </p>
          {price && <p className="font-bold">${price.toFixed(2)}</p>}
        </div>
        {(canEdit || canDelete) && (
          <div className="mt-2 flex gap-1">
            {canEdit && <EditButton id={id} />}
            {canDelete && (
              <DeleteButton id={id} title={title} updateList={updateList} />
            )}
          </div>
        )}
      </div>
    </div>
  );

  return isLink ? (
    <Link to={`/books/${id}`} state={book}>
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    publisher: PropTypes.string,
    publishedYear: PropTypes.number,
    pages: PropTypes.number,
    isbn10: PropTypes.string,
    isbn13: PropTypes.string,
    description: PropTypes.string,
    genre: PropTypes.array,
    ageCategory: PropTypes.string,
    condition: PropTypes.string,
    coverType: PropTypes.string,
    language: PropTypes.string,
    price: PropTypes.number,
    coverImageUrl: PropTypes.string,
  }),
  canEdit: PropTypes.bool,
  canDelete: PropTypes.bool,
  updateList: PropTypes.func,
  isLink: PropTypes.bool,
};

export default BookCard;
