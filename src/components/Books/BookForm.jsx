import PropTypes from 'prop-types';

import useBookForm from '../../hooks/useBookForm';
import Preloader from '../../layouts/Preloader';
import {
  ageCategories,
  conditions,
  coverTypes,
  genres,
  languages,
} from '../../utils/selectUtils';
import AddImage from '../account/addBook/AddImage';
import Cancel from '../account/addBook/CancelButton';
import SaveBook from '../account/addBook/SaveBookButton';
import LabelAndInput from '../Form/LabelAndInput';
import LabelAndSelect from '../Form/LabelAndSelect';
import LabelAndTextarea from '../Form/LabelAndTextarea';

const BookForm = ({ id = '' }) => {
  const {
    form,
    error,
    imageSrc,
    isLoading,
    setFile,
    setImageSrc,
    handleFileUpload,
    handleChange,
    handleChangeSelect,
    handleSubmit,
  } = useBookForm(id);

  return (
    <>
      {/* {isLoading ? (
        <Preloader />
      ) : ( */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="flex flex-col gap-10 sm:flex-row">
          {/* First column */}
          <div className="sm:flex-1">
            <LabelAndInput
              id="title"
              name="title"
              type="text"
              value={form.title}
              error={error.title}
              onChange={handleChange}
            >
              Title
            </LabelAndInput>
            <LabelAndInput
              id="author"
              name="author"
              type="text"
              value={form.author}
              error={error.author}
              onChange={handleChange}
            >
              Author
            </LabelAndInput>
            <LabelAndInput
              id="publisher"
              name="publisher"
              type="text"
              value={form.publisher}
              error={error.publisher}
              onChange={handleChange}
            >
              Publisher
            </LabelAndInput>
            <LabelAndInput
              id="publishedYear"
              name="publishedYear"
              type="number"
              value={form.publishedYear}
              min={1440}
              max={new Date().getFullYear()}
              error={error.publishedYear}
              onChange={handleChange}
            >
              Published Year
            </LabelAndInput>
            <LabelAndSelect
              id="language"
              name="language"
              value={form.language}
              data={languages}
              onChange={handleChangeSelect}
            >
              Language
            </LabelAndSelect>
            <LabelAndInput
              id="pages"
              name="pages"
              type="number"
              value={form.pages}
              min={2}
              error={error.pages}
              onChange={handleChange}
            >
              Pages Count
            </LabelAndInput>

            <AddImage
              error={error}
              imageSrc={imageSrc}
              setImageSrc={setImageSrc}
              handleFileUpload={handleFileUpload}
              handleChange={handleChange}
              setFile={setFile}
            />
          </div>
          {/* Second column */}
          <div className="sm:flex-1">
            <LabelAndSelect
              id="ageCategory"
              name="ageCategory"
              value={form.ageCategory}
              data={ageCategories}
              error={error.ageCategory}
              onChange={handleChangeSelect}
            >
              Age Category
            </LabelAndSelect>
            <LabelAndSelect
              id="genre"
              name="genre"
              value={form.genre}
              data={genres}
              multiple={true}
              error={error.genre}
              onChange={handleChangeSelect}
            >
              Genre
            </LabelAndSelect>
            <LabelAndSelect
              id="condition"
              name="condition"
              value={form.condition}
              data={conditions}
              error={error.condition}
              onChange={handleChangeSelect}
            >
              Condition
            </LabelAndSelect>
            <LabelAndSelect
              id="coverType"
              name="coverType"
              value={form.coverType}
              data={coverTypes}
              error={error.coverType}
              onChange={handleChangeSelect}
            >
              Cover
            </LabelAndSelect>
            <div className="flex gap-4">
              <LabelAndInput
                id="isbn10"
                name="isbn10"
                type="number"
                value={form.isbn10}
                error={error.isbn10}
                onChange={handleChange}
              >
                ISBN-10
              </LabelAndInput>
              <LabelAndInput
                id="isbn13"
                name="isbn13"
                type="number"
                value={form.isbn13}
                error={error.isbn13}
                onChange={handleChange}
              >
                ISBN-13
              </LabelAndInput>
            </div>
            <LabelAndTextarea
              id="description"
              name="description"
              type="text"
              value={form.description}
              error={error.description}
              onChange={handleChange}
            >
              Description
            </LabelAndTextarea>
            <LabelAndInput
              id="price"
              name="price"
              type="number"
              min={0.1}
              step={0.01}
              value={form.price}
              error={error.price}
              onChange={handleChange}
            >
              Price ($)
            </LabelAndInput>
          </div>
        </div>
        <div className="flex justify-center gap-5">
          <Cancel />
          <SaveBook />
        </div>
        {error.form && <p className="mt-2 text-red">{error.form}</p>}
        {isLoading && <Preloader />}
      </form>
      {/* )} */}
    </>
  );
};

BookForm.propTypes = {
  id: PropTypes.string,
};

export default BookForm;
