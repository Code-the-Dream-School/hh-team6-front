import PropTypes from 'prop-types';

const BookCard = ({ img, title, author }) => {
  return (
    <div className="flex w-52 max-w-52 flex-col items-center rounded bg-lightBlue p-4 shadow-md lg:w-40 xl:w-52">
      <img className="h-auto w-32" src={img} alt={`Cover of ${title}`} />
      <div className="pt-4 text-center">
        <h2 className="mb-2 text-lg font-bold">{title}</h2>
        <p className="text-gray-700 text-sm">by {author}</p>
      </div>
    </div>
  );
};

BookCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};
export default BookCard;
