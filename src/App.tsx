
import { Suspense, lazy, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "@/components/ErrorBoundary";
import SplashScreen from "@/components/SplashScreen";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const PlayDrop = lazy(() => import("./pages/PlayDrop"));
const PetGame = lazy(() => import("./pages/PetGame"));
const Welcome = lazy(() => import("./pages/Welcome"));
const AuthPage = lazy(() => import("./pages/AuthPage"));

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
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
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
