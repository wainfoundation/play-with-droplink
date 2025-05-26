
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProvider } from "@/context/UserContext";
import HomePage from "@/pages/Home";
import ProfilePage from "@/pages/ProfilePage";
import LoginPage from "@/pages/Login";
import SignupPage from "@/pages/Signup";
import PricingPage from "@/pages/Pricing";
import DevelopersPage from "@/pages/Developers";
import NotFoundPage from "@/pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import StickersCatalog from "@/pages/StickersCatalog";
import MyStickers from "@/pages/MyStickers";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </UserProvider>
    </HelmetProvider>
  );
}

export default App;
