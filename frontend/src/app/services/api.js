import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Get the access token from localStorage
const accessToken = localStorage.getItem('access_token');

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: accessToken ? `Bearer ${accessToken}` : '',
  },
});

api.interceptors.response.use(
  response => response,
  async error => {
    // No refresh logic anymore, handle 401 errors by redirecting to login
    if (error.response.status === 401) {
      console.error("Unauthorized, redirecting to login");
      // Remove any invalid tokens
      localStorage.removeItem('access_token');
      // Redirect to login page
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default api;
