
import { Suspense, lazy, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "@/components/ErrorBoundary";
import SplashScreen from "@/components/SplashScreen";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const PlayDrop = lazy(() => import("./pages/PlayDrop"));
const PetGame = lazy(() => import("./pages/PetGame"));
const Welcome = lazy(() => import("./pages/Welcome"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const AppContent = () => {
  const [showSplash, setShowSplash] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Only show splash on the home route
    if (location.pathname === '/') {
      const hasSeenSplash = localStorage.getItem('hasSeenSplash');
      if (!hasSeenSplash) {
        setShowSplash(true);
      }
    }
  }, [location.pathname]);

  const handleSplashComplete = () => {
    setShowSplash(false);
    localStorage.setItem('hasSeenSplash', 'true');
  };

  if (showSplash && location.pathname === '/') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<PlayDrop />} />
        <Route path="/pet" element={<PetGame />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
