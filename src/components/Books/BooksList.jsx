import PropTypes from 'prop-types';

import BookCard from './BookCard';

const BooksList = ({
  list,
  canEdit = false,
  canDelete = false,
  showPrice = false,
  isSavedBooks = false,
  updateList,
  isLinkList = false,
}) => {
  return (
    <div className="container mx-auto">
      <div className="grid justify-items-center gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-5">
        {list.map((item) => (
          <BookCard
            key={item._id}
            book={item}
            canEdit={canEdit}
            canDelete={canDelete}
            isSavedBooks={isSavedBooks}
            isAvailable={!item.isUnavailable}
            updateList={updateList}
            isLink={isLinkList}
            {...(showPrice ? { price: item.price } : {})}
          />
        ))}
      </div>
    </div>
  );
};

BooksList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  showPrice: PropTypes.bool,
  canEdit: PropTypes.bool,
  isSavedBooks: PropTypes.bool,
  canDelete: PropTypes.bool,
  updateList: PropTypes.func,
  isLinkList: PropTypes.bool,
};

export default BooksList;
