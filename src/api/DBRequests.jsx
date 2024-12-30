import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const UNEXPECTED_ERROR_MESSAGE = 'An unexpected error occurred';
const BOOK_LIMIT = 50;

// const handleApiRequest = async (url, headers, payload, token = '') => {
//   try {
//     if (token) {
//       headers.Authorization = `Bearer ${token}`;
//     }

//     const { data, status } = await axios.post(
//       `${API_BASE_URL}${url}`,
//       payload,
//       {
//         headers,
//       }
//     );

//     return { data, status };
//   } catch (error) {
//     const errorMessage =
//       error?.response?.data?.msg ||
//       error?.response?.data?.error ||
//       UNEXPECTED_ERROR_MESSAGE;

//     throw new Error(errorMessage);
//   }
// };
const handleApiRequest = async (
  url,
  headers,
  payload,
  token = '',
  method = 'POST'
) => {
  try {
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const { data, status } = await axios({
      method, // Dynamically set the HTTP method
      url: `${API_BASE_URL}${url}`,
      data: method !== 'GET' && method !== 'DELETE' ? payload : undefined,
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

export const getBooks = async (setIsLoading, setBooksList, sortBy, filters) => {
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
