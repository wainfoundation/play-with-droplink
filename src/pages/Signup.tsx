
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";
import { PiAuthButton } from "@/components/auth/PiAuthButton";
import { EmailSignupForm } from "@/components/auth/EmailSignupForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Signup = () => {
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
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 space-y-4">
            <h1 className="text-4xl font-bold text-primary mb-4">Join Droplink</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Create your profile and start building your Pi Network presence
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="pi">Pi Network</TabsTrigger>
              </TabsList>
              
              <TabsContent value="email" className="mt-6">
                <EmailSignupForm />
              </TabsContent>
              
              <TabsContent value="pi" className="mt-6">
                <div className="space-y-6">
                  <PiAuthButton />
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Join the Pi Network community and start monetizing your content
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Already part of the community?
              </p>
              <Link 
                to="/login" 
                className="text-primary hover:text-primary/80 font-semibold text-lg transition-colors duration-200 hover:underline"
              >
                Sign in to your profile
              </Link>
            </div>
          </div>
          
          <div className="mt-8 text-center space-y-3">
            <p className="text-sm text-gray-500 leading-relaxed">
              ✓ Custom profile page • ✓ Pi Network integration • ✓ Analytics dashboard
            </p>
            <p className="text-xs text-gray-400">
              Start free • Upgrade anytime • Built for Pi Network
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
