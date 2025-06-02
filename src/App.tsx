
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import SplashWrapper from "./components/welcome/SplashWrapper";
import PiBrowserDialog from "./components/PiBrowserDialog";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const PlayWithMascot = lazy(() => import("./pages/PlayWithMascot"));
const TriviaTime = lazy(() => import("./pages/TriviaTime"));
const Help = lazy(() => import("./pages/Help"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const OtherApps = lazy(() => import("./pages/OtherApps"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SplashWrapper>
              <div className="min-h-screen flex flex-col bg-white">
                <Navbar />
                <main className="flex-grow">
                  <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading...</p>
                      </div>
                    </div>
                  }>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/play" element={<PlayWithMascot />} />
                      <Route path="/trivia" element={<TriviaTime />} />
                      <Route path="/help" element={<Help />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/other-apps" element={<OtherApps />} />
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
                <PiBrowserDialog />
              </div>
            </SplashWrapper>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
