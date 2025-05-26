
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/context/UserContext";
import { FeedbackWidget } from "@/components/feedback/FeedbackWidget";
import { NetworkStatus } from "@/components/network/NetworkStatus";
import { SecurityHeaders } from "@/components/security/SecurityHeaders";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { CookieConsent } from "@/components/privacy/CookieConsent";
import AdminStatusProvider from "@/components/admin/AdminStatusProvider";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Pages
import Index from "@/pages/Index";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Pricing from "@/pages/Pricing";
import Features from "@/pages/Features";
import Templates from "@/pages/Templates";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Help from "@/pages/Help";
import AllFaqs from "@/pages/AllFaqs";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Cookies from "@/pages/Cookies";
import GDPR from "@/pages/GDPR";
import ProfilePage from "@/pages/ProfilePage";
import Demo from "@/pages/Demo";
import NotFound from "@/pages/NotFound";
import Admin from "@/pages/Admin";
import AdminPortal from "@/pages/AdminPortal";
import Store from "@/pages/Store";
import Groups from "@/pages/Groups";
import GroupChat from "@/pages/GroupChat";
import Community from "@/pages/Community";
import CreatorDirectory from "@/pages/CreatorDirectory";
import Careers from "@/pages/Careers";
import Developers from "@/pages/Developers";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <AdminStatusProvider>
              <Router>
                <SecurityHeaders />
                <Helmet>
                  <title>Droplink.space - Link in Bio for Pi Network Creators</title>
                  <meta name="description" content="The ultimate link in bio tool for Pi Network creators. Share all your links, earn Pi tips, and grow your audience with beautiful, customizable profiles." />
                </Helmet>
                <div className="min-h-screen bg-background">
                  <NetworkStatus />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/templates" element={<Templates />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/all-faqs" element={<AllFaqs />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/cookies" element={<Cookies />} />
                    <Route path="/gdpr" element={<GDPR />} />
                    <Route path="/demo" element={<Demo />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin-portal" element={<AdminPortal />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/groups" element={<Groups />} />
                    <Route path="/groups/:id" element={<GroupChat />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/creators" element={<CreatorDirectory />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/developers" element={<Developers />} />
                    <Route path="/@:username" element={<ProfilePage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Toaster />
                  <FeedbackWidget />
                  <CookieConsent />
                </div>
              </Router>
            </AdminStatusProvider>
          </UserProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
