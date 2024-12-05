import { useState } from 'react';

import { addBook } from '../api/DBRequests';
import { useAccount } from '../context/AccountProvider';
import { useAuth } from '../context/AuthProvider';

const useAddBookForm = () => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    publisher: '',
    publishedYear: '',
    language: '',
    pages: 0,
    ageCategory: '',
    genre: [],
    condition: '',
    coverType: '',
    isbn10: '',
    isbn13: '',
    description: '',
    price: 0,
    coverImageUrl: '',
  });
  const [error, setError] = useState({});

  const { token } = useAuth();
  const { setAccountPage } = useAccount();

  const regex = /^[0-9]*\.?[0-9]{0,2}$/;
  const isbn10Pattern = /^(?:\d{9}[\dXx]|\d{10})$/;
  const isbn13Pattern = /^(97[89])(\d{1,5})(\d{1,7})(\d{1,7})(\d{1})$/;

  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
      setForm((prevForm) => ({ ...prevForm, ['coverImageUrl']: '' }));
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'price') {
      if (!regex.test(value)) {
        return;
      }
    }

    setError((prevError) => {
      const newError = { ...prevError };
      delete newError[name];
      return newError;
    });

    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleChangeSelect = (name, value) => {
    setError((prevError) => {
      const newError = { ...prevError };
      delete newError[name];
      return newError;
    });
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    const formData = new FormData();

    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (file) {
      formData.append('file', file);
    }

    const headers = file
      ? { 'Content-Type': 'multipart/form-data' }
      : { 'Content-Type': 'application/json' };

    const cleanedForm = Object.fromEntries(
      Object.entries(form).filter(
        ([_, value]) => value !== null && value !== undefined && value !== ''
      )
    );

    for (const [key, value] of Object.entries(cleanedForm)) {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(`${key}[]`, item));
      } else {
        formData.append(key, value);
      }
    }

    try {
      const result = await addBook(headers, formData, token);
      if (result.status === 201) {
        setAccountPage('myBooks');
      }
    } catch (error) {
      setError((prevError) => ({
        ...prevError,
        form: error.message,
      }));
    }
  };

  const validateForm = () => {
    const currentYear = new Date().getFullYear();
    const errors = {};

    if (!form.title) {
      errors.title = 'Title is required';
    } else if (form.title.length < 2 || form.title.length > 100) {
      errors.title = 'Title must be between 2 and 100 characters';
    }

    if (!form.author) {
      errors.author = 'Author is required';
    } else if (form.author.length < 2 || form.author.length > 100) {
      errors.author = 'Author must be between 2 and 100 characters';
    }

    if (!form.publisher) {
      errors.publisher = 'Publisher is required';
    } else if (form.publisher.length < 2 || form.publisher.length > 100) {
      errors.publisher = 'Publisher must be between 2 and 100 characters';
    }

    if (!form.publishedYear) {
      errors.publishedYear = 'Published Year is required';
    } else if (form.publishedYear < 1400) {
      errors.publishedYear = 'Published year must be a valid year';
    } else if (form.publishedYear > currentYear) {
      errors.publishedYear = `Published Year cannot be greater than ${currentYear}`;
    }

    if (!form.pages) {
      errors.pages = 'Pages is required';
    } else if (form.pages < 2) {
      errors.pages = `The number of pages must be at least 2`;
    }

    if (!form.ageCategory) {
      errors.ageCategory = 'Age Category is required';
    }

    if (form.genre.length === 0) {
      errors.genre = 'Genre is required';
    }

    if (!form.condition) {
      errors.condition = 'Condition is required';
    }

    if (!form.coverType) {
      errors.coverType = 'Cover is required';
    }

    if (!form.isbn10 && !form.isbn13) {
      errors.isbn10 = 'Either ISBN-10 or ISBN-13 must be provided';
      errors.isbn13 = 'Either ISBN-10 or ISBN-13 must be provided';
    } else {
      if (form.isbn10 && !isbn10Pattern.test(form.isbn10)) {
        errors.isbn10 = 'Invalid ISBN-10 format';
      }

      if (form.isbn13 && !isbn13Pattern.test(form.isbn13)) {
        errors.isbn13 = 'Invalid ISBN-13 format';
      }
    }

    if (!form.description) {
      errors.description = 'Description is required';
    } else if (form.description.length < 2 || form.description.length > 500) {
      errors.description = 'Description must be between 2 and 100 characters';
    }

    if (!form.price) {
      errors.price = 'Price is required';
    } else if (form.price < 0.1) {
      errors.price = `Price cannot be less than $0.10`;
    }

    if (form.coverImageUrl && !form.coverImageUrl.startsWith('https://')) {
      errors.coverImageUrl = 'Cover image URL must start with "https://"';
    }

    return errors;
  };

  return {
    form,
    error,
    imageSrc,
    setFile,
    setImageSrc,
    handleChange,
    handleChangeSelect,
    handleSubmit,
    handleFileUpload,
  };
};

export default useAddBookForm;
