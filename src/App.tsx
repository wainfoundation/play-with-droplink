
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { UserProvider, useUser } from "@/context/UserContext";
import { initPiNetwork } from "@/services/piNetwork";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pricing from "./pages/Pricing";
import Features from "./pages/Features";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AdminPortal from "./pages/AdminPortal";
import ProfilePage from "./pages/ProfilePage";

// Company Pages
import About from "./pages/About";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";

// Resources Pages
import Help from "./pages/Help";
import Templates from "./pages/Templates";
import CreatorDirectory from "./pages/CreatorDirectory";
import Developers from "./pages/Developers";

// Legal Pages
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  useEffect(() => {
    // Initialize Pi Network SDK
    initPiNetwork();
    
    // Log environment info (remove in production)
    console.log("Environment:", {
      isDevMode: import.meta.env.DEV,
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

// Separate component for routes to use the useUser hook
const AppRoutes = () => {
  const { isLoggedIn, isLoading } = useUser();
  
  // Authentication-protected route wrapper
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-medium text-primary">Loading...</h2>
          </div>
        </div>
      );
    }
    
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    
    return <>{children}</>;
  };
  
  return (
    <Routes>
      {/* Main Pages */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/features" element={<Features />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminPortal />
          </ProtectedRoute>
        } 
      />
      
      {/* Handle /demo route - redirect to home */}
      <Route path="/demo" element={<Navigate to="/" replace />} />
      
      {/* Company Pages */}
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* Resources Pages */}
      <Route path="/help" element={<Help />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/creators" element={<CreatorDirectory />} />
      <Route path="/developers" element={<Developers />} />
      
      {/* Legal Pages */}
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/cookies" element={<Cookies />} />
      
      {/* User profile pages - support both formats */}
      <Route path="/u/:username" element={<ProfilePage />} />
      <Route path="/@:username" element={<ProfilePage />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
