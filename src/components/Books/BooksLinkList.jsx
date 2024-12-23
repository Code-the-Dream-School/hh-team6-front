import PropTypes from 'prop-types';

import BookCardLink from './BookCardLink';

const BooksList = ({
  list,
  canEdit = false,
  canDelete = false,
  showPrice = false,
  updateList,
}) => {
  return (
    <div className="container mx-auto">
      <div className="grid justify-items-center gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-5">
        {list.map((item) => (
          <BookCardLink
            key={item._id}
            id={item._id}
            img={item.coverImageUrl}
            title={item.title}
            price={item.price}
            author={item.author}
            canEdit={canEdit}
            canDelete={canDelete}
            updateList={updateList}
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
      image: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.string,
    })
  ),
  showPrice: PropTypes.bool,
  canEdit: PropTypes.bool,
  canDelete: PropTypes.bool,
  updateList: PropTypes.func,
};

export default BooksList;
