import PropTypes from 'prop-types';

import BookCard from './BookCard';

const BooksList = ({ list }) => {
  return (
    <div className="container mx-auto">
      <div className="grid justify-items-center gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-5">
        {list.map((item, index) => (
          <BookCard
            key={index}
            img={item.coverImageUrl}
            title={item.title}
            author={item.author}
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
};

export default BooksList;
