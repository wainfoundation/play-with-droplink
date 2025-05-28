
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { UserProvider } from "@/context/UserContext";
import PiBrowserGuard from "@/components/PiBrowserGuard";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import PiDashboard from "./pages/PiDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pricing from "./pages/Pricing";
import Features from "./pages/Features";
import StorePage from "./components/store/StorePage";
import NotFound from "./pages/NotFound";
import Templates from "./pages/Templates";
import Help from "./pages/Help";
import HelpArticle from "./pages/HelpArticle";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import GDPR from "./pages/GDPR";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import CreatorDirectory from "./pages/CreatorDirectory";
import Developers from "./pages/Developers";
import Demo from "./pages/Demo";
import Cookies from "./pages/Cookies";
import DomainVerification from "./pages/DomainVerification";
import Stickers from "./pages/Stickers";
import SystemStatus from "./pages/SystemStatus";

// ValidationKey component inline since it's simple
const ValidationKey = () => {
  return (
    <div className="min-h-screen bg-white">
      <pre className="p-4 font-mono text-sm">
        7511661aac4538b1832d2c9ba117f6d972b26a54640598d3fbb9824013c7079203f65b02d125be3f418605cfb89ba0e4443e3ec997e3800eb464df0bc5410d2a
      </pre>
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <UserProvider>
          <PiBrowserGuard>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/pi-dashboard" element={<PiDashboard />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/features" element={<Features />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/stickers" element={<Stickers />} />
                <Route path="/help" element={<Help />} />
                <Route path="/help/:slug" element={<HelpArticle />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/gdpr" element={<GDPR />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/creators" element={<CreatorDirectory />} />
                <Route path="/developers" element={<Developers />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/validation-key.txt" element={<ValidationKey />} />
                <Route path="/verify-domain" element={<DomainVerification />} />
                <Route path="/status" element={<SystemStatus />} />
                <Route path="/:username" element={<ProfilePage />} />
                <Route path="/:username/store" element={<StorePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </PiBrowserGuard>
        </UserProvider>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
