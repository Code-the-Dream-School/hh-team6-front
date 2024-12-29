import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import DeleteButton from './DeleteButton';
import DeleteSavedBookButton from './DeleteSavedBookButton';
import EditButton from './EditButton';

const BookCard = ({
  id,
  img,
  title,
  author,
  price,
  isbn,
  canEdit,
  canDelete,
  updateList,
  isSavedBooks,
  isAvailable,
}) => {
  return (
    <div className="relative flex w-52 max-w-52 flex-col items-center rounded bg-lightBlue p-4 lg:w-40 xl:w-52">
      {isSavedBooks && (
        <div className="absolute right-1 top-1 h-[33px] rounded bg-white bg-opacity-80 p-1 shadow hover:bg-grayHover">
          <DeleteSavedBookButton
            id={id}
            title={title}
            updateList={updateList}
          />
        </div>
      )}
      <img className="h-auto w-32" src={img} alt={`Cover of ${title}`} />
      <div className="flex h-full w-full flex-col pt-4 text-center">
        <div className="flex-1">
          <h2 className="mb-2 text-lg font-bold">{title}</h2>
          <p className="text-gray-700 mb-2 text-sm">by {author}</p>
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
                  search: `?isbn=${isbn}`,
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
};

BookCard.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  price: PropTypes.number,
  isbn: PropTypes.string,
  canEdit: PropTypes.bool,
  canDelete: PropTypes.bool,
  updateList: PropTypes.func,
  isSavedBooks: PropTypes.bool,
  isAvailable: PropTypes.bool,
};
export default BookCard;
