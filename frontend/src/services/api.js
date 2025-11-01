import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('dhms_token');
    if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
    return config;
  },
  (err) => Promise.reject(err)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    if (status === 401 && error?.response?.data?.message.startsWith("Invalid JWT token: ")) {
      try {
        localStorage.removeItem('dhms_token');
        localStorage.removeItem('dhms_user');
      } catch (e) {
        // ignore
      }

      window.location.assign('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
