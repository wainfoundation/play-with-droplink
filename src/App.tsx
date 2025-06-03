import React, { Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/hooks/useAuth';
import { PiContextProvider } from '@/contexts/PiContext';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import LandingPage from '@/pages/LandingPage';
import Index from '@/pages/Index';

function AppRoutes() {
  const { loading, isAuthenticated } = useAuth();
  const location = useLocation();
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setShowSplashScreen(false);
    }, 1000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    if (showSplashScreen) {
      return (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    return (
      <Suspense fallback={
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/" element={<Index />} />
          <Route path="/home" element={
            <Suspense fallback={<p>Loading...</p>}>
              {/* <Home /> */}
            </Suspense>
          } />
          <Route path="/play" element={
            <Suspense fallback={<p>Loading...</p>}>
              {/* <PlayWithMascot /> */}
            </Suspense>
          } />
          <Route path="/playdrop" element={
            <Suspense fallback={<p>Loading...</p>}>
              {/* <PlayDropDemo /> */}
            </Suspense>
          } />
          <Route path="/shop" element={
            <Suspense fallback={<p>Loading...</p>}>
              {/* <Shop /> */}
            </Suspense>
          } />
          <Route path="/inventory" element={
            <Suspense fallback={<p>Loading...</p>}>
              {/* <Inventory /> */}
            </Suspense>
          } />
          <Route path="/stats" element={
            <Suspense fallback={<p>Loading...</p>}>
              {/* <Stats /> */}
            </Suspense>
          } />
          <Route path="/wallet" element={
            <Suspense fallback={<p>Loading...</p>}>
              {/* <Wallet /> */}
            </Suspense>
          } />
          <Route path="/settings" element={
            <Suspense fallback={<p>Loading...</p>}>
              {/* <Settings /> */}
            </Suspense>
          } />
          <Route path="/auth" element={
            <Suspense fallback={<p>Loading...</p>}>
              {/* <AuthPage /> */}
            </Suspense>
          } />
          <Route path="*" element={<p>404 Not Found</p>} />
        </Routes>
      </Suspense>
    );
  };

  return renderContent();
}

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        defaultTheme="system"
        storageKey="droplink-theme"
      >
        <PiContextProvider>
          <Router>
            <AppRoutes />
            <Toaster />
            <Analytics />
            <SpeedInsights />
          </Router>
        </PiContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
