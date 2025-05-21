
import React, { useEffect } from 'react';
import { useUser } from "@/context/UserContext";
import { useAdminStatus } from "@/hooks/useAdminStatus";

interface AdminStatusProviderProps {
  children: React.ReactNode;
}

export const AdminStatusProvider: React.FC<AdminStatusProviderProps> = ({ children }) => {
  const { isAdmin: adminStatus, isLoading } = useAdminStatus();
  const { setIsAdmin } = useUser();

  // Update the global admin status when the admin status check completes
  useEffect(() => {
    if (!isLoading) {
      setIsAdmin(adminStatus);
    }
  }, [adminStatus, isLoading, setIsAdmin]);

  return <>{children}</>;
};

export default AdminStatusProvider;
