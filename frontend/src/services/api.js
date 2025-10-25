import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

// Attach token automatically if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('dhms_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    console.log(localStorage.getItem('dhms_user'));
    console.log("-------------------------------------------------------");
    return config;
  },
  (err) => Promise.reject(err)
);

export default api;
