import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const UNEXPECTED_ERROR_MESSAGE = 'An unexpected error occurred';
const BOOKS_LIMIT = 50;

const handleApiRequest = async (
  url,
  config = {},
  payload,
  token = '',
  method = 'post'
) => {
  try {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const { data, status } = await axios[method](
      `${API_BASE_URL}${url}`,
      method === 'get' || method === 'delete' ? config : payload,
      method === 'get' || method === 'delete' ? undefined : config
    );

    return { data, status };
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

//auth
export const login = (headers, credentials) =>
  handleApiRequest('/api/v1/login', { headers }, credentials);

export const register = (headers, userData) =>
  handleApiRequest('/api/v1/register', { headers }, userData);

export const sendResetLinkRequest = async (email) =>
  await handleApiRequest(`/api/v1/forgot-password`, {}, email);

export const updatePassword = async ({ newPassword, token }) =>
  await handleApiRequest(`/api/v1/password-reset`, null, {
    newPassword,
    token,
  });

//books
export const getBooks = async (
  setIsLoading,
  sortBy = '',
  filters = {},
  limit = BOOKS_LIMIT,
  skip = 0
) => {
  setIsLoading(true);

  const stringFilters = Object.fromEntries(
    Object.entries(filters).map(([key, values]) =>
      Array.isArray(values) ? [key, values.join(',')] : [key, values]
    )
  );

  const params = {
    limit: limit,
    skip: skip,
    sort: sortBy || undefined,
    ...stringFilters,
  };

  const {
    data: { books },
  } = await handleApiRequest('/api/v1/books', { params }, null, null, 'get');

  setIsLoading(false);

  return books;
};

export const addBook = (headers, bookData, token) => {
  return handleApiRequest(
    '/api/v1/books',
    { headers: headers },
    bookData,
    token
  );
};

export const getBook = async (id, setIsLoading) => {
  setIsLoading(true);

  const {
    data: { book },
  } = await handleApiRequest(`/api/v1/books/${id}`, null, null, null, 'get');

  setIsLoading(false);

  return book;
};

export const deleteBook = async (id, token) => {
  await handleApiRequest(
    `/api/v1/books/${id}`,
    { headers: {} },
    null,
    token,
    'delete'
  );
};

export const updateBook = (headers, bookData, token, id) => {
  return handleApiRequest(
    `/api/v1/books/${id}`,
    { headers },
    bookData,
    token,
    'patch'
  );
};

//saved books
export const getSavedBooks = async (setIsLoading, sortBy, token) => {
  setIsLoading(true);

  const params = {
    sort: sortBy,
  };

  const headers = {};

  const {
    data: {
      savedBooks: { books },
    },
  } = await handleApiRequest(
    '/api/v1/saved-books',
    { headers, params },
    null,
    token,
    'get'
  );

  const filteredBooks = books.filter((book) => book.listings.length > 0);
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

  setIsLoading(false);

  return savedBooks;
};

export const deleteSavedBook = async (id, token) => {
  const data = { savedBookId: id };
  await handleApiRequest(
    `/api/v1/saved-books/`,
    { headers: {}, data },
    null,
    token,
    'delete'
  );
};

//profile
export const updateProfile = (headers, userData, token) =>
  handleApiRequest('/api/v1/update', { headers }, userData, token, 'patch');

//messages
export const getChats = async (setIsLoading, setChats, token) => {
  setIsLoading(true);
  const { data } = await handleApiRequest(
    '/api/v1/chats',
    { headers: {} },
    null,
    token,
    'get'
  );
  setChats(data);
  setIsLoading(false);
  return data;
};

export const addChat = async (setIsLoading, userId, token) => {
  setIsLoading(true);
  const {
    data: { chat },
  } = await handleApiRequest(
    '/api/v1/chats',
    { headers: {} },
    { userId: userId },
    token,
    'post'
  );

  setIsLoading(false);
  return chat;
};

export const getChatMessages = async (
  setIsLoading,
  setMessages,
  token,
  chat_id
) => {
  setIsLoading(true);
  const { data } = await handleApiRequest(
    `/api/v1/chats/${chat_id}/messages`,
    { headers: {} },
    null,
    token,
    'get'
  );
  setMessages(data.messages);
  setIsLoading(false);
};

export const sendMessage = async (setIsLoading, chat_id, message, token) => {
  await handleApiRequest(
    `/api/v1/chats/${chat_id}/messages`,
    { headers: {} },
    { message },
    token,
    'post'
  );
  setIsLoading(false);
};
