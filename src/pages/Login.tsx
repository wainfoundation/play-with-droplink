
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";
import { PiAuthButton } from "@/components/auth/PiAuthButton";
import { PiTestNetBanner } from "@/components/PiTestNetBanner";
import PiBrowserRedirect from "@/components/auth/PiBrowserRedirect";
import { isRunningInPiBrowser } from "@/utils/pi-sdk";

const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();
  const [isPiBrowser, setIsPiBrowser] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const checkBrowser = () => {
      const inPiBrowser = isRunningInPiBrowser();
      setIsPiBrowser(inPiBrowser);
      
      if (!inPiBrowser) {
        // Auto-redirect after 3 seconds if not in Pi Browser
        const timer = setTimeout(() => {
          try {
            const currentUrl = window.location.href;
            const piUrl = `https://minepi.com/browser/open?url=${encodeURIComponent(currentUrl)}`;
            window.location.href = piUrl;
          } catch (error) {
            console.error("Auto-redirect failed:", error);
          }
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    };
    
    checkBrowser();
  }, []);

  const handleContinueAnyway = () => {
    setShowLogin(true);
  };

  if (!isPiBrowser && !showLogin) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8 space-y-4">
              <h1 className="text-4xl font-bold text-primary mb-4">Welcome Back</h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                Sign in with your Pi Network wallet to access Droplink
              </p>
            </div>
            
            <PiBrowserRedirect 
              onContinue={handleContinueAnyway}
              showContinueOption={true}
            />
            
            <div className="mt-6 text-center">
              <p className="text-xs text-orange-600">
                Redirecting automatically in 3 seconds...
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 space-y-4">
            <h1 className="text-4xl font-bold text-primary mb-4">Welcome Back</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Sign in with your Pi Network wallet to access Droplink
            </p>
          </div>
          
          <PiTestNetBanner />
          
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="space-y-6">
              <PiAuthButton />
              
              <div className="text-center">
                <p className="text-sm text-gray-500 leading-relaxed">
                  Connect with Pi Network to access exclusive features and Pi-based payments
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 leading-relaxed">
              Join thousands of Pi Network creators building their digital presence
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
