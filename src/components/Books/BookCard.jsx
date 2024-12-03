import PropTypes from 'prop-types';

const BookCard = ({ img, title, author }) => {
  return (
    <div className="flex w-52 flex-col rounded bg-lightBlue px-6 py-5">
      <img className="h-30 rounded-t-lg object-cover" src={img} alt="Book" />
      <div className="pt-4">
        <h2 className="mb-2 font-bold">{title}</h2>
        <p className="text-gray-700"> by {author}</p>
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
