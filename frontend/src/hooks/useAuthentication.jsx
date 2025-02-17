import { useState, useEffect } from "react";
import useFetchUserDetails from "./useFetchUserDetails";
import { usePathname } from "next/navigation"; 

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { userDetails, fetchUserDetails } = useFetchUserDetails();
  const pathname = usePathname(); 

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      setIsAuthenticated(true);
      fetchUserDetails(); 
    } else {
      setIsAuthenticated(false);
    }
  }, [pathname]); 


  return { isAuthenticated, userDetails };
};

export default useAuthentication;
