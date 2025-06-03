
import { Helmet } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SecurityHeaders } from "@/components/security/SecurityHeaders";
import { useAuthSystem } from "@/hooks/useAuthSystem";
import SessionManager from "@/components/security/SessionManager";
import SplashWrapper from "@/components/welcome/SplashWrapper";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import PlayWithMascot from "./pages/PlayWithMascot";
import PlayDrop from "./pages/PlayDrop";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Create query client outside of component to avoid recreation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Home page wrapper that shows splash/welcome flow for new users
const HomeWrapper = () => {
  const { user, loading } = useAuthSystem();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // For authenticated users, show splash/welcome flow
  if (user) {
    return (
      <SplashWrapper>
        <Index />
      </SplashWrapper>
    );
  }
  
  // For non-authenticated users, show Index directly
  return <Index />;
};

// Auth wrapper component for protected game routes
const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthSystem();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeWrapper />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/play" element={
          <AuthWrapper>
            <PlayWithMascot />
          </AuthWrapper>
        } />
        <Route path="/playdrop" element={
          <AuthWrapper>
            <PlayDrop />
          </AuthWrapper>
        } />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/terms" element={<Privacy />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SecurityHeaders />
        <SessionManager />
        <AppRoutes />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
