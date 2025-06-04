
import { Helmet } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import SplashWrapper from "@/components/welcome/SplashWrapper";
import Index from "./pages/Index";
import PlayWithMascot from "./pages/PlayWithMascot";
import Shop from "./pages/Shop";
import CoinStore from "./pages/CoinStore";
import Inventory from "./pages/Inventory";
import Wallet from "./pages/Wallet";
import Games from "./pages/Games";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import Missions from "./pages/Missions";
import Welcome from "./pages/Welcome";
import PetSetup from "./pages/PetSetup";
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
  return (
    <SplashWrapper>
      <Index />
    </SplashWrapper>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main entry point */}
        <Route path="/" element={<HomeWrapper />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/pet-setup" element={<PetSetup />} />
        
        {/* Main game hub - both /play and /home route to the same component */}
        <Route path="/play" element={<PlayWithMascot />} />
        <Route path="/home" element={<PlayWithMascot />} />
        
        {/* Game feature pages */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/coin-store" element={<CoinStore />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/games" element={<Games />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<Settings />} />
        
        {/* Static pages */}
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/terms" element={<Privacy />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Redirects for consistency */}
        <Route path="/auth" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/signup" element={<Navigate to="/" replace />} />
        
        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
