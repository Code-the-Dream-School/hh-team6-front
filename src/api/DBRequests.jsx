import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async ({ email, password }) => {
  try {
    const { data, status } = await axios.post(`${API_BASE_URL}/api/v1/login`, {
      email,
      password,
    });
    return { data, status };
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
};
