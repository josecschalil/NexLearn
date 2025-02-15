import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Ensure localStorage is accessed only on the client
const getAccessToken = () => (typeof window !== "undefined" ? localStorage.getItem("access_token") : null);
const getRefreshToken = () => (typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null);

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : '',
  },
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newTokens = await refreshAccessToken();
      if (newTokens) {
        // Save new tokens in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", newTokens.access);
        }
        originalRequest.headers['Authorization'] = `Bearer ${newTokens.access}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

async function refreshAccessToken() {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await axios.post(`${apiUrl}/api/token/refresh/`, { refresh: refreshToken });
    
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", response.data.access);
    }
    
    return response.data;
  } catch (error) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_id");
      window.location.href = '/signin';
    }
    return null;
  }
}

export default api;
