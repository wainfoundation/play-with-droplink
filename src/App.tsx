import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { UserProvider } from "@/context/UserContext";
import { AdminStatusProvider } from "@/components/admin/AdminStatusProvider";
import { SecurityHeaders } from "@/components/security/SecurityHeaders";
import EnhancedSessionManager from "@/components/security/EnhancedSessionManager";
import { CookieConsent } from "@/components/privacy/CookieConsent";
import { NetworkStatus } from "@/components/network/NetworkStatus";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import Index from "./pages/Index";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import AdminPortal from "./pages/AdminPortal";
import AdminDashboard from "./pages/AdminDashboard";
import PiDashboard from "./pages/PiDashboard";
import ProfilePage from "./pages/ProfilePage";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Templates from "./pages/Templates";
import Demo from "./pages/Demo";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import HelpArticle from "./pages/HelpArticle";
import AllFaqs from "./pages/AllFaqs";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import GDPR from "./pages/GDPR";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Careers from "./pages/Careers";
import Community from "./pages/Community";
import Developers from "./pages/Developers";
import DevelopersPage from "./pages/DevelopersPage";
import SystemStatus from "./pages/SystemStatus";
import CreatorDirectory from "./pages/CreatorDirectory";
import DomainVerification from "./pages/DomainVerification";
import Store from "./pages/Store";
import Groups from "./pages/Groups";
import GroupChat from "./pages/GroupChat";
import Stickers from "./pages/Stickers";
import UserInfo from "./pages/auth/UserInfo";
import YourInformation from "./pages/register/YourInformation";
import SelectCategories from "./pages/register/SelectCategories";
import SelectTemplate from "./pages/register/create/SelectTemplate";
import SelectPlatforms from "./pages/register/create/SelectPlatforms";
import AddLinks from "./pages/register/create/AddLinks";
import NameImageBio from "./pages/register/create/NameImageBio";
import Complete from "./pages/register/create/Complete";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <SecurityHeaders />
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <AdminStatusProvider>
              <TooltipProvider>
                <BrowserRouter>
                  <NetworkStatus />
                  <EnhancedSessionManager />
                  <div className="min-h-screen bg-background font-sans antialiased">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/login-page" element={<LoginPage />} />
                      <Route path="/signup-page" element={<SignupPage />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/admin-portal" element={<AdminPortal />} />
                      <Route path="/admin-dashboard" element={<AdminDashboard />} />
                      <Route path="/pi-dashboard" element={<PiDashboard />} />
                      <Route path="/@:username" element={<ProfilePage />} />
                      <Route path="/features" element={<Features />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/templates" element={<Templates />} />
                      <Route path="/demo" element={<Demo />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/help" element={<Help />} />
                      <Route path="/help/:articleId" element={<HelpArticle />} />
                      <Route path="/faqs" element={<AllFaqs />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/cookies" element={<Cookies />} />
                      <Route path="/gdpr" element={<GDPR />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:slug" element={<BlogPost />} />
                      <Route path="/careers" element={<Careers />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/developers" element={<Developers />} />
                      <Route path="/developers-page" element={<DevelopersPage />} />
                      <Route path="/system-status" element={<SystemStatus />} />
                      <Route path="/creators" element={<CreatorDirectory />} />
                      <Route path="/domain-verification" element={<DomainVerification />} />
                      <Route path="/store" element={<Store />} />
                      <Route path="/groups" element={<Groups />} />
                      <Route path="/groups/:groupId" element={<GroupChat />} />
                      <Route path="/stickers" element={<Stickers />} />
                      <Route path="/auth/userinfo" element={<UserInfo />} />
                      <Route path="/register/your-information" element={<YourInformation />} />
                      <Route path="/register/select-categories" element={<SelectCategories />} />
                      <Route path="/register/create/select-template" element={<SelectTemplate />} />
                      <Route path="/register/create/select-platforms" element={<SelectPlatforms />} />
                      <Route path="/register/create/add-links" element={<AddLinks />} />
                      <Route path="/register/create/name-image-bio" element={<NameImageBio />} />
                      <Route path="/register/create/complete" element={<Complete />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                  <Toaster />
                  <Sonner />
                  <CookieConsent />
                </BrowserRouter>
              </TooltipProvider>
            </AdminStatusProvider>
          </UserProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
