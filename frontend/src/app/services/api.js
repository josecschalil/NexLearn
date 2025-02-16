import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


const getAccessToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

const getRefreshToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null;


const refreshAccessToken = async () => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return null; 

    const response = await axios.post(`${apiUrl}/auth/token/refresh/`, {
      refresh: refreshToken,
    });

    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", response.data.access);
    }

    return response.data.access;
  } catch (error) {
    console.error("Token refresh failed:", error);

    if (error.response && error.response.status === 401) {
      logoutUser();
    }

    return null;
  }
};


const logoutUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");
    window.location.href = "/signin";
  }
};


const api = axios.create({
  baseURL: apiUrl,
});


api.interceptors.request.use(
  async (config) => {
    let token = getAccessToken();

    if (!token) {

      token = await refreshAccessToken();
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newToken = await refreshAccessToken();

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

const initializeAuth = async () => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (!accessToken && refreshToken) {
    console.log("Access token missing! Trying to refresh...");
    await refreshAccessToken();
  }
};


initializeAuth();

export default api;
