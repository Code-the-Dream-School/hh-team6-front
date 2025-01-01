import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import DeleteButton from './DeleteButton';
import DeleteSavedBookButton from './DeleteSavedBookButton';
import EditButton from './EditButton';

const BookCard = ({
  book,
  canEdit,
  canDelete,
  updateList,
  isSavedBooks,
  isAvailable,
  isLink = false,
}) => {
  const { _id: id, title, coverImageUrl, price, author } = book;
  const cardContent = (
    <div className="relative grid w-52 max-w-52 grid-rows-[12rem_auto] items-center rounded bg-lightBlue p-4 lg:w-40 xl:w-52">
      {isSavedBooks && (
        <div className="absolute right-1 top-1 h-[33px] rounded bg-white bg-opacity-80 p-1 shadow hover:bg-grayHover">
          <DeleteSavedBookButton
            id={id}
            title={title}
            updateList={updateList}
          />
        </div>
      )}
      <img
        className="mx-auto h-48 w-32 object-cover"
        src={coverImageUrl}
        alt={`Cover of ${title}`}
      />
      <div className="mt-4 flex h-full w-full flex-col text-center">
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
        {isSavedBooks && (
          <div className="items-center">
            {!isAvailable ? (
              <p className="mt-2 text-red">Sold</p>
            ) : (
              <Link
                to={{
                  pathname: '/books',
                  search: `?isbn=${book.isbn}`,
                }}
                className="h-[35px] rounded border border-blueGray px-2 py-1 text-center text-blueGray"
              >
                Listings
              </Link>
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
    isbn: PropTypes.string,
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
  isSavedBooks: PropTypes.bool,
  isAvailable: PropTypes.bool,
  isLink: PropTypes.bool,
};

export default BookCard;
