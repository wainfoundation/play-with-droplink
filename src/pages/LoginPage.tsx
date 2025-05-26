
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";
import { PiAuthButton } from "@/components/auth/PiAuthButton";
import { EmailLoginForm } from "@/components/auth/EmailLoginForm";
import { PiTestNetBanner } from "@/components/PiTestNetBanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from "react-helmet-async";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();
  const [activeTab, setActiveTab] = useState("email");
  
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Helmet>
        <title>Login - Droplink.space</title>
        <meta name="description" content="Sign in to your Droplink account and manage your profile" />
      </Helmet>
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 space-y-4">
            <h1 className="text-4xl font-bold text-primary mb-4">Welcome Back</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Sign in to manage your Droplink profile and connect with the Pi Network community
            </p>
          </div>
          
          <PiTestNetBanner />
          
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="pi">Pi Network</TabsTrigger>
              </TabsList>
              
              <TabsContent value="email" className="mt-6">
                <EmailLoginForm />
              </TabsContent>
              
              <TabsContent value="pi" className="mt-6">
                <div className="space-y-6">
                  <PiAuthButton />
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Connect with Pi Network to access exclusive features and Pi-based payments
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Don't have an account?
              </p>
              <Link 
                to="/signup" 
                className="text-primary hover:text-primary/80 font-semibold text-lg transition-colors duration-200 hover:underline"
              >
                Create your Droplink profile
              </Link>
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

export default LoginPage;
