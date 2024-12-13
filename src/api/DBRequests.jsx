import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const UNEXPECTED_ERROR_MESSAGE = 'An unexpected error occurred';
const BOOK_LIMIT = 50;

const handleApiRequest = async (url, headers, payload, token = '') => {
  try {
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const { data, status } = await axios.post(
      `${API_BASE_URL}${url}`,
      payload,
      {
        headers,
      }
    );

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

export const books = async (setIsLoading, setBooksList, sortBy, filters) => {
  const url = '/api/v1/books';

  const stringFilters = Object.fromEntries(
    Object.entries(filters).map(([key, values]) => [key, values.join(',')])
  );

  try {
    setIsLoading(true);
    const { data, status } = await axios.get(`${API_BASE_URL}${url}`, {
      params: {
        limit: BOOK_LIMIT,
        sort: sortBy,
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
