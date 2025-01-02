import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const UNEXPECTED_ERROR_MESSAGE = 'An unexpected error occurred';
const BOOKS_LIMIT = 50;

const handleApiRequest = async (
  url,
  headers,
  payload,
  token = '',
  method = ''
) => {
  try {
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const { data, status } =
      method === 'PATCH'
        ? await axios.patch(`${API_BASE_URL}${url}`, payload, {
            headers,
          })
        : await axios.post(`${API_BASE_URL}${url}`, payload, {
            headers,
          });
    return { data, status };
  } catch (error) {
    const errorMessage =
      error?.response?.data?.msg ||
      error?.response?.data?.error ||
      UNEXPECTED_ERROR_MESSAGE;

    throw new Error(errorMessage);
  }
};

export const login = (headers, credentials) =>
  handleApiRequest('/api/v1/login', headers, credentials);

export const register = (headers, userData) =>
  handleApiRequest('/api/v1/register', headers, userData);

export const addBook = (headers, bookData, token) => {
  return handleApiRequest('/api/v1/books', headers, bookData, token);
};

export const updateProfile = (headers, userData, token) =>
  handleApiRequest('/api/v1/update', headers, userData, token, 'PATCH');

export const updateBook = (headers, bookData, token, id) => {
  return handleApiRequest(
    `/api/v1/books/${id}`,
    headers,
    bookData,
    token,
    'PATCH'
  );
};

// Provide default values for `sortBy` and `filters` as not all components use them
export const getBooks = async (
  setIsLoading,
  setBooksList,
  sortBy = '',
  filters = {},
  limit = BOOKS_LIMIT
) => {
  const url = '/api/v1/books';

  const stringFilters = Object.fromEntries(
    Object.entries(filters).map(([key, values]) =>
      Array.isArray(values) ? [key, values.join(',')] : [key, values]
    )
  );

  try {
    setIsLoading(true);
    const { data, status } = await axios.get(`${API_BASE_URL}${url}`, {
      params: {
        limit: limit,
        sort: sortBy || undefined,
        ...stringFilters,
      },
    });

    setBooksList(data.books);
    setIsLoading(false);

    return { data, status };
  } catch (error) {
    const errorMessage =
      error?.response?.data?.msg ||
      error?.response?.data?.error ||
      UNEXPECTED_ERROR_MESSAGE;

    throw new Error(errorMessage);
  }
};

export const getSavedBooks = async (
  setIsLoading,
  setBooksList,
  sortBy,
  token
) => {
  const url = '/api/v1/saved-books';

  try {
    setIsLoading(true);
    const { data, status } = await axios.get(`${API_BASE_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: BOOKS_LIMIT,
        sort: sortBy,
      },
    });

    const filteredBooks = data.savedBooks.books.filter(
      (book) => book.listings.length > 0
    );
    const savedBooks = filteredBooks.map((book) => {
      const availableListings = book.listings.filter(
        (listing) => listing.isAvailable
      );

      return {
        _id: book.savedBookId,
        coverImageUrl: (availableListings.length > 0
          ? availableListings[0]
          : book.listings[0]
        ).coverImageUrl,
        title: book.title,
        author: book.author,
        isbn: book.isbn10 || book.isbn13,
        ...(availableListings.length === 0 && { isUnavailable: true }),
      };
    });

    setBooksList(savedBooks);
    setIsLoading(false);

    return { data, status };
  } catch (error) {
    const errorMessage =
      error?.response?.data?.msg ||
      error?.response?.data?.error ||
      UNEXPECTED_ERROR_MESSAGE;

    throw new Error(errorMessage);
  }
};

export const getBook = async (id, setIsLoading) => {
  const url = `/api/v1/books/${id}`;

  try {
    const {
      data: { book },
    } = await axios.get(`${API_BASE_URL}${url}`);
    setIsLoading(false);

    return book;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.msg ||
      error?.response?.data?.error ||
      UNEXPECTED_ERROR_MESSAGE;

    const customError = new Error(errorMessage);
    customError.status = error?.response?.status;
    throw customError;
  }
};

export const deleteBook = async (id, token) => {
  const url = `/api/v1/books/${id}`;
  try {
    const response = await axios.delete(`${API_BASE_URL}${url}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.msg ||
      error?.response?.data?.error ||
      UNEXPECTED_ERROR_MESSAGE;

    throw new Error(errorMessage);
  }
};

const handlePasswordRequest = async (url, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${url}`, data);
    return response;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.msg ||
      error?.response?.data?.error ||
      UNEXPECTED_ERROR_MESSAGE;

    throw new Error(errorMessage);
  }
};

export const sendResetLinkRequest = (email) =>
  handlePasswordRequest(`/api/v1/forgot-password`, email);

export const updatePassword = ({ newPassword, token }) =>
  handlePasswordRequest(`/api/v1/password-reset`, { newPassword, token });

export const deleteSavedBook = async (id, token) => {
  const url = `/api/v1/saved-books/`;
  try {
    const response = await axios.delete(`${API_BASE_URL}${url}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { savedBookId: id },
    });

    return response;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.msg ||
      error?.response?.data?.error ||
      UNEXPECTED_ERROR_MESSAGE;

    throw new Error(errorMessage);
  }
};
