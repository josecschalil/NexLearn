import { useState } from "react";
import axios from "axios";

let isRefreshing = false;

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


const useTokenRefresh = () => {
  const [isRefreshingState, setIsRefreshingState] = useState(false);

  const refreshToken = async () => {
    if (isRefreshing) return; // Prevent multiple refresh requests

    isRefreshing = true; // Mark the flag as true when refreshing
    setIsRefreshingState(true);
    try {
      const refresh = localStorage.getItem("refresh_token");
      if (!refresh) throw new Error("Refresh token not found");

      const response = await axios.post(`${apiUrl}/auth/token/refresh/ `, {
        refresh,
      });

      const { access } = response.data;
      localStorage.setItem("access_token", access);
      return access;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logout();
    } finally {
      isRefreshing = false; // Reset the flag after refreshing
      setIsRefreshingState(false);
    }
  };

  return { refreshToken, isRefreshingState };
};

export default useTokenRefresh;
