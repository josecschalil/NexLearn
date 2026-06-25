import { useState } from "react";
import axios from "axios";
import { canRefreshDemoToken, refreshDemoAccessToken } from "@/app/services/demoAuth";

let isRefreshing = false;

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Logout function to remove tokens and user data
const logout = () => {
  console.log("Logging out...");
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");
  }
  console.log("Logged out successfully.");
};

const useTokenRefresh = () => {
  console.log("in hook toenrefresh")
  const [isRefreshingState, setIsRefreshingState] = useState(false);

  const refreshToken = async () => {
    console.log("Starting token refresh...");
  
    try {
      if (canRefreshDemoToken()) {
        return refreshDemoAccessToken();
      }

      const refresh = localStorage.getItem("refresh_token");
      console.log("Refresh token:", refresh);
  
      if (!refresh) {
        console.log("Refresh token not found");
        throw new Error("Refresh token not found");
      }
  
      console.log("Sending refresh token request...");
      const response = await axios.post(`${apiUrl}auth/token/refresh/`, {
        refresh,
      });
  
      console.log("Token refresh response:", response.data);
      const { access } = response.data; // Extract the access token
  
      // Save the new access token
      localStorage.setItem("access_token", access);
      console.log("New access token saved:", access);
  
      return access;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logout(); // Log out if refresh fails
    }
  };
  

  return { refreshToken, isRefreshingState };
};

export default useTokenRefresh;
