import { useState } from "react";
import axios from "axios";
import useTokenRefresh from "./useTokenRefresh";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const useFetchUserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const { refreshToken } = useTokenRefresh();

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("Access token not found");

      const response = await axios.get(`${apiUrl}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserDetails(response.data); // Now stores all user details
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
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
