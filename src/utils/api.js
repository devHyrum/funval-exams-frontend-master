import axios from 'axios';

/* const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
}); */
const BASE_URL = 'http://localhost:3000/api'; // Ajusta esto según tu configuración

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;