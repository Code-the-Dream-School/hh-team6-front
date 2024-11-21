import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const UNEXPECTED_ERROR_MESSAGE = 'An unexpected error occurred';

const handleApiRequest = async (url, payload) => {
  try {
    const { data, status } = await axios.post(`${API_BASE_URL}${url}`, payload);
    return { data, status };
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error || UNEXPECTED_ERROR_MESSAGE;
    throw new Error(errorMessage);
  }
};

export const login = (credentials) =>
  handleApiRequest('/api/v1/login', credentials);

export const register = (userData) =>
  handleApiRequest('/api/v1/register', userData);
