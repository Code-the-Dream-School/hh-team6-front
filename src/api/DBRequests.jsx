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
