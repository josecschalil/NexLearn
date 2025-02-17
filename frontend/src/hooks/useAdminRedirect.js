import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useAuthentication from "@/hooks/useAuthentication";

const useAdminRedirect = ({ redirectLink, toastMessage }) => {
  const { isAuthenticated, userDetails, loading } = useAuthentication();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.push(redirectLink); 
    } else if (userDetails && userDetails.is_staff === false) {
      toast.error(toastMessage); 
      router.push(redirectLink); 
    }
  }, [isAuthenticated, userDetails, loading, router, redirectLink, toastMessage]);

  return { isAuthenticated, userDetails, loading };
};

export default useAdminRedirect;
