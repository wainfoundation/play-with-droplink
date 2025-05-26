import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProvider } from "@/context/UserContext";
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import PricingPage from "@/pages/PricingPage";
import DevelopersPage from "@/pages/DevelopersPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { QueryClient } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import StickersCatalog from "@/pages/StickersCatalog";
import MyStickers from "@/pages/MyStickers";

function App() {
  return (
    <HelmetProvider>
      <UserProvider>
        <QueryClient>
          <Toaster />
          <TooltipProvider>
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/@:username" element={<ProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/developers" element={<DevelopersPage />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/stickers" element={<StickersCatalog />} />
                <Route path="/my-stickers" element={<MyStickers />} />
              </Routes>
            </Router>
          </TooltipProvider>
        </QueryClient>
      </UserProvider>
    </HelmetProvider>
  );
}

export default App;
