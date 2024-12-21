import GifBook from '../assets/images/animated-book.gif';

const BookSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
    <img src={GifBook} alt="Book flipping spinner" className="h-40 w-40" />
  </div>
);

export default BookSpinner;
