import BookForm from '../../components/Books/BookForm';

const AddBook = () => {
  return (
    <>
      <h1 className="mb-6 flex justify-center font-headings text-2xl font-bold">
        Add New Book
      </h1>

      <BookForm />
    </>
  );
};

export default AddBook;
