
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { SplashWrapper } from "@/components/welcome/SplashWrapper";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import FullScreenPetGame from "./components/pet/FullScreenPetGame";
import MiniGameHub from "./components/games/MiniGameHub";
import PetShop from "./components/economy/PetShop";
import PetInventory from "./components/pet/PetInventory";
import DailyRewards from "./components/rewards/DailyRewards";
import StorePage from "./components/store/StorePage";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SplashWrapper><Home /></SplashWrapper>} />
              <Route path="/play" element={<FullScreenPetGame />} />
              <Route path="/games" element={<MiniGameHub onBack={() => window.history.back()} />} />
              <Route path="/shop" element={<PetShop onBack={() => window.history.back()} onItemPurchased={() => {}} />} />
              <Route path="/inventory" element={<PetInventory onBack={() => window.history.back()} />} />
              <Route path="/rewards" element={<DailyRewards onBack={() => window.history.back()} />} />
              <Route path="/coin-store" element={<StorePage />} />
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
