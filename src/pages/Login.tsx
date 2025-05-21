
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";
import { PiAuthButton } from "@/components/auth/PiAuthButton";
import { initPiNetwork } from "@/services/piPaymentService";
import PiBrowserPrompt from "@/components/PiBrowserPrompt";
import PiBrowserDialog from "@/components/PiBrowserDialog";
import { isRunningInPiBrowser } from "@/utils/pi-sdk";

const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();
  // Perform check directly for debugging
  const isPiBrowser = isRunningInPiBrowser();
  
  console.log("Login page - isPiBrowser:", isPiBrowser, "isLoggedIn:", isLoggedIn);

  useEffect(() => {
    // Initialize Pi Network SDK
    const initialized = initPiNetwork();
    console.log("Pi SDK initialization status:", initialized);
    
    // Check if user is already logged in
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to manage your Droplink</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <PiAuthButton />
            
            {!isPiBrowser && <PiBrowserPrompt />}
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Always render the dialog, it will only show if not in Pi Browser */}
      <PiBrowserDialog 
        redirectUrl="https://pinet.com/@droplink"
        showOnMount={true}
      />
    </div>
  );
};

export default Login;
