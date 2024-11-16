import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
};
