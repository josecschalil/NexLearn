import { useState } from "react";
import api from "@/app/services/api";

const useFetchUserDetails = () => {
  console.log("In fetch user details");
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = async () => {
    try {
      console.log("Fetching user details...");
      const response = await api.get("/api/user"); // Using 'api' instead of axios
      console.log("User details fetched successfully:", response.data);
      setUserDetails(response.data);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  return { userDetails, fetchUserDetails };
};

export default useFetchUserDetails;
