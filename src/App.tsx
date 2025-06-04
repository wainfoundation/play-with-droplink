
import { Suspense, lazy, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "@/components/ErrorBoundary";
import SplashScreen from "@/components/SplashScreen";

// Lazy load all components
const Home = lazy(() => import("./pages/Home"));
const PlayDrop = lazy(() => import("./pages/PlayDrop"));
const PetGame = lazy(() => import("./pages/PetGame"));
const Welcome = lazy(() => import("./pages/Welcome"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Additional pages
const About = lazy(() => import("./pages/About"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminPortal = lazy(() => import("./pages/AdminPortal"));
const AllFaqs = lazy(() => import("./pages/AllFaqs"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Careers = lazy(() => import("./pages/Careers"));
const Community = lazy(() => import("./pages/Community"));
const Contact = lazy(() => import("./pages/Contact"));
const Cookies = lazy(() => import("./pages/Cookies"));
const CreatorDirectory = lazy(() => import("./pages/CreatorDirectory"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Demo = lazy(() => import("./pages/Demo"));
const Developers = lazy(() => import("./pages/Developers"));
const DevelopersPage = lazy(() => import("./pages/DevelopersPage"));
const DomainVerification = lazy(() => import("./pages/DomainVerification"));
const Features = lazy(() => import("./pages/Features"));
const Forums = lazy(() => import("./pages/Forums"));
const GDPR = lazy(() => import("./pages/GDPR"));
const Games = lazy(() => import("./pages/Games"));
const GroupChat = lazy(() => import("./pages/GroupChat"));
const Groups = lazy(() => import("./pages/Groups"));
const Help = lazy(() => import("./pages/Help"));
const HelpArticle = lazy(() => import("./pages/HelpArticle"));
const Index = lazy(() => import("./pages/Index"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Login = lazy(() => import("./pages/Login"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const OtherApps = lazy(() => import("./pages/OtherApps"));
const PiDashboard = lazy(() => import("./pages/PiDashboard"));
const PlayWithMascot = lazy(() => import("./pages/PlayWithMascot"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Privacy = lazy(() => import("./pages/Privacy"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const Settings = lazy(() => import("./pages/Settings"));
const Shop = lazy(() => import("./pages/Shop"));
const Signup = lazy(() => import("./pages/Signup"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const Stats = lazy(() => import("./pages/Stats"));
const Stickers = lazy(() => import("./pages/Stickers"));
const Store = lazy(() => import("./pages/Store"));
const SystemStatus = lazy(() => import("./pages/SystemStatus"));
const Templates = lazy(() => import("./pages/Templates"));
const Terms = lazy(() => import("./pages/Terms"));
const Wallet = lazy(() => import("./pages/Wallet"));

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
        {/* Core Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/index" element={<Index />} />
        <Route path="/welcome" element={<Welcome />} />
        
        {/* Game Pages */}
        <Route path="/play" element={<PlayDrop />} />
        <Route path="/pet" element={<PetGame />} />
        <Route path="/games" element={<Games />} />
        <Route path="/play-with-mascot" element={<PlayWithMascot />} />
        
        {/* Authentication */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-page" element={<SignupPage />} />
        
        {/* User Dashboard & Profile */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pi-dashboard" element={<PiDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/stats" element={<Stats />} />
        
        {/* Commerce & Wallet */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/store" element={<Store />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/pricing" element={<Pricing />} />
        
        {/* Community */}
        <Route path="/community" element={<Community />} />
        <Route path="/forums" element={<Forums />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/group-chat" element={<GroupChat />} />
        <Route path="/creator-directory" element={<CreatorDirectory />} />
        
        {/* Information Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/help" element={<Help />} />
        <Route path="/help-article" element={<HelpArticle />} />
        <Route path="/faqs" element={<AllFaqs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/other-apps" element={<OtherApps />} />
        
        {/* Developer Resources */}
        <Route path="/developers" element={<Developers />} />
        <Route path="/developers-page" element={<DevelopersPage />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/system-status" element={<SystemStatus />} />
        <Route path="/domain-verification" element={<DomainVerification />} />
        
        {/* Blog */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-post" element={<BlogPost />} />
        
        {/* Admin */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-portal" element={<AdminPortal />} />
        
        {/* Miscellaneous */}
        <Route path="/stickers" element={<Stickers />} />
        
        {/* Legal & Compliance */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/gdpr" element={<GDPR />} />
        
        {/* 404 */}
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
