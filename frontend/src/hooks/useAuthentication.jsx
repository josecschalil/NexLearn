import { useState, useEffect } from "react";
import useFetchUserDetails from "./useFetchUserDetails";
import { usePathname } from "next/navigation";

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { userDetails, fetchUserDetails } = useFetchUserDetails();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      setIsAuthenticated(true);
      fetchUserDetails(); // Fetch user details
    } else {
      setIsAuthenticated(false);
      setLoading(false); // Done loading even if not authenticated
    }
  }, [pathname]);

  useEffect(() => {
    if (userDetails !== null) {
      setLoading(false); // Stop loading when user details are fetched
    }
  }, [userDetails]);

  return { isAuthenticated, userDetails, loading };
};

export default useAuthentication;
