import { useState, useEffect } from "react";
import useFetchUserDetails from "./useFetchUserDetails";
import { usePathname } from "next/navigation"; 

const useAuthentication = () => {
  console.log("in useauth")
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log("Initializing authentication process...");
  const { userDetails, fetchUserDetails } = useFetchUserDetails();
  const pathname = usePathname(); 

  useEffect(() => {
    console.log("Checking for access token in localStorage...");
    const token = localStorage.getItem("access_token");

    if (token) {
      console.log("Access token found, setting authentication status to true...");
      setIsAuthenticated(true);
      console.log("Fetching user details...");
      fetchUserDetails(); 
    } else {
      console.log("No access token found, setting authentication status to false...");
      setIsAuthenticated(false);
    }
  }, [pathname]); 

  console.log("Authentication status:", isAuthenticated);

  return { isAuthenticated, userDetails };
};

export default useAuthentication;
