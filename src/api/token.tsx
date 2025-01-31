import axios from 'axios';

const getToken = () => {
  const TOKEN_KEY = 'token';
  return sessionStorage.getItem(TOKEN_KEY);
};

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { api }; // Exportação nomeada
