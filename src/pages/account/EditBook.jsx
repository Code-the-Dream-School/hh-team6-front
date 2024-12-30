import BookForm from '../../components/Books/BookForm';
import { useAccount } from '../../context/AccountProvider';

const EditBook = () => {
  const { currentBookId } = useAccount();

  return (
    <>
      <h1 className="mb-6 flex justify-center font-headings text-2xl font-bold">
        Edit Book
      </h1>

      <BookForm id={currentBookId} />
    </>
  );
};

export default EditBook;
