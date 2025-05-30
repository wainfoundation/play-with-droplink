import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";
import { SecurePiAuthButton } from "@/components/auth/SecurePiAuthButton";
import { PiTestNetBanner } from "@/components/PiTestNetBanner";
import { Helmet } from "react-helmet-async";
import GoToTop from '@/components/GoToTop';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();
  
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Helmet>
        <title>Login - Droplink.space</title>
        <meta name="description" content="Sign in to your Droplink account with Pi Network" />
      </Helmet>
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
              <SecurePiAuthButton />
              
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
      <GoToTop />
    </>
  );
};

export default LoginPage;
