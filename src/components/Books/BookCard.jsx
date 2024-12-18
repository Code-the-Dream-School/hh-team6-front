import PropTypes from 'prop-types';

import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

const BookCard = ({
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
    <div className="flex w-52 max-w-52 flex-col items-center rounded bg-lightBlue p-4 lg:w-40 xl:w-52">
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
  canEdit: PropTypes.bool,
  canDelete: PropTypes.bool,
  updateList: PropTypes.func,
};
export default BookCard;
