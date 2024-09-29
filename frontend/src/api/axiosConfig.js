// src/api/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: If you use token-based authentication
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Or get it from cookies/storage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
