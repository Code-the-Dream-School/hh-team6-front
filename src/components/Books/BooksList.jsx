import PropTypes from 'prop-types';

import BookCard from './BookCard';

const BooksList = ({ list }) => {
  return (
    <div className="flex flex-col flex-wrap gap-4 md:flex-row md:gap-16">
      {list.map((item, index) => (
        <BookCard
          key={index}
          img={item.image}
          title={item.title}
          author={item.author}
        />
      ))}
    </div>
  );
};

BooksList.propTypes = {
  list: PropTypes.array.isRequired,
};
export default BooksList;
