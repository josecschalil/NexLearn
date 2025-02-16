import { useState } from "react";
import axios from "axios";
import useTokenRefresh from "./useTokenRefresh";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const useFetchUserDetails = () => {
  console.log("in fetch user detials")
  const [userDetails, setUserDetails] = useState(null);

  console.log("Initializing token refresh function...");
  const { refreshToken } = useTokenRefresh();

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("access_token");
      console.log("Access token:", token);

      if (!token) {
        console.log("Access token not found");
        throw new Error("Access token not found");
      }

      console.log("Fetching user details with token...");
      const response = await axios.get(`${apiUrl}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("User details fetched successfully:", response.data);
      setUserDetails(response.data); // Now stores all user details
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized request (401). Attempting to refresh token...");
        
        const newToken = await refreshToken();
        if (newToken) {
          console.log("Token refreshed successfully. Retrying user details fetch...");
          fetchUserDetails();
        }
      } else {
        console.error("Failed to fetch user details:", error);
      }
    }
  };

  return { userDetails, fetchUserDetails };
};

export default useFetchUserDetails;
