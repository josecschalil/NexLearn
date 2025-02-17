import { useState } from "react";
import api from "@/app/services/api";

const useFetchUserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const response = await api.get("/api/user"); 
      setUserDetails(response.data);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  return { userDetails, fetchUserDetails };
};

export default useFetchUserDetails;
