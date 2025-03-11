import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export const apiClient = axios.create({
  baseURL: API_URL,
  httpsAgent: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
