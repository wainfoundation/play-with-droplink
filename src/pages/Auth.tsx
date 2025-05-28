
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";

const Auth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // If user is already authenticated, redirect to userinfo setup
      navigate("/auth/userinfo", { replace: true });
    } else {
      // If not authenticated, redirect to userinfo for Pi Auth
      navigate("/auth/userinfo", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
      <Helmet>
        <title>Sign In - Droplink</title>
      </Helmet>
      
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to authentication...</p>
      </div>
    </div>
  );
};

export default Auth;
