
import { Helmet } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import SplashWrapper from "@/components/welcome/SplashWrapper";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import PlayWithMascot from "./pages/PlayWithMascot";
import PlayDrop from "./pages/PlayDrop";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Welcome from "./pages/Welcome";
import PetSetup from "./pages/PetSetup";
import Shop from "./pages/Shop";
import CoinStore from "./pages/CoinStore";
import Inventory from "./pages/Inventory";
import Wallet from "./pages/Wallet";
import Games from "./pages/Games";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";

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
        {/* Main game flow with splash/welcome */}
        <Route path="/" element={<HomeWrapper />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/pet-setup" element={<PetSetup />} />
        
        {/* Game pages */}
        <Route path="/play" element={<PlayWithMascot />} />
        <Route path="/home" element={<PlayWithMascot />} />
        <Route path="/playdrop" element={<PlayDrop />} />
        
        {/* Game feature pages */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/coin-store" element={<CoinStore />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/games" element={<Games />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<Settings />} />
        
        {/* Auth pages */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<Navigate to="/auth" replace />} />
        <Route path="/signup" element={<Navigate to="/auth" replace />} />
        
        {/* Static pages */}
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/terms" element={<Privacy />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UserProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </UserProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
