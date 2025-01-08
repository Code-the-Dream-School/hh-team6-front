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
  sortBy = '',
  filters = {},
  limit = BOOKS_LIMIT,
  skip = 0
) => {
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

export const getBook = async (id) => {
  const {
    data: { book },
  } = await handleApiRequest(`/api/v1/books/${id}`, null, null, null, 'get');
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
export const getSavedBooks = async (sortBy, token) => {
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
export const getChats = async (setChats, token) => {
  const { data } = await handleApiRequest(
    '/api/v1/chats',
    { headers: {} },
    null,
    token,
    'get'
  );
  setChats(data);
  return data;
};

export const addChat = async (userId, token) => {
  const {
    data: { chat },
  } = await handleApiRequest(
    '/api/v1/chats',
    { headers: {} },
    { userId: userId },
    token,
    'post'
  );
  return chat;
};

export const getChatMessages = async (setMessages, token, chat_id) => {
  const { data } = await handleApiRequest(
    `/api/v1/chats/${chat_id}/messages`,
    { headers: {} },
    null,
    token,
    'get'
  );
  setMessages(data.messages);
};

export const sendMessage = async (chat_id, message, token) => {
  await handleApiRequest(
    `/api/v1/chats/${chat_id}/messages`,
    { headers: {} },
    { message },
    token,
    'post'
  );
};

//cart
export const addToCart = (headers, cartData, token) => {
  return handleApiRequest('/api/v1/cart', headers, cartData, token);
};

export const getCart = async (setIsLoading, setCartItems, setTotals, token) => {
  const url = '/api/v1/cart';

  try {
    setIsLoading(true);
    const { data } = await axios.get(`${API_BASE_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { cart } = data;
    setCartItems(cart.orderItems || []);
    setTotals({
      tax: cart.tax || 0,
      shippingFee: cart.shippingFee || 0,
      total: cart.total || 0,
    });

    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    const errorMessage =
      error?.response?.data?.msg ||
      error?.response?.data?.error ||
      UNEXPECTED_ERROR_MESSAGE;

    throw new Error(errorMessage);
  }
};
export const deleteFromCart = (headers, cartItemId, token) => {
  const url = `/api/v1/cart/${cartItemId}`;
  return handleApiRequest(url, headers, {}, token, 'DELETE');
};

//orders
export const getOrders = async (token) => {
  const headers = {};

  const { data: {buyOrders, sellOrders} } = await handleApiRequest(
    '/api/v1/orders',
    { headers },
    null,
    token,
    'get'
  );

  return {buyOrders, sellOrders};
};
