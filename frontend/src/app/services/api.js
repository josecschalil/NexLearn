// src/services/api.js
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Get the access token from localStorage
const accessToken = localStorage.getItem('access_token');
const refreshToken = localStorage.getItem('refresh_token'); // If you are storing the refresh token

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: accessToken ? `Bearer ${accessToken}` : '',
  },
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newTokens = await refreshAccessToken();
      if (newTokens) {
        // Save new tokens in localStorage
        localStorage.setItem('access_token', newTokens.access);
        originalRequest.headers['Authorization'] = `Bearer ${newTokens.access}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

async function refreshAccessToken() {
  try {
    console.log("Refreshing token with refresh token:", refreshToken); // Log refresh token
    const response = await axios.post(`${apiUrl}/api/token/refresh/`, { refresh: refreshToken });
    console.log("Token refresh successful:", response.data); // Log response
    return response.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    // Handle refresh failure (e.g., logout user)
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // Redirect to login page
    window.location.href = '/signin';
    return null;
  }
}

export default api;
