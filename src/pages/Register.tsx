
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the proper onboarding flow
    navigate("/register/your-information", { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
      <Helmet>
        <title>Register - Droplink</title>
      </Helmet>
      
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to registration...</p>
      </div>
    </div>
  );
};

export default Register;
