
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import AdminStatusProvider from "./components/admin/AdminStatusProvider";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import Store from "./pages/Store";
import Groups from "./pages/Groups";
import GroupChat from "./pages/GroupChat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import GDPR from "./pages/GDPR";
import Demo from "./pages/Demo";
import Templates from "./pages/Templates";
import Developers from "./pages/Developers";
import Community from "./pages/Community";
import CreatorDirectory from "./pages/CreatorDirectory";
import Careers from "./pages/Careers";
import AllFaqs from "./pages/AllFaqs";
import AdminPortal from "./pages/AdminPortal";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <AdminStatusProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/store" element={<Store />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/groups/:groupId/chat" element={<GroupChat />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/help" element={<Help />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/gdpr" element={<GDPR />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/developers" element={<Developers />} />
              <Route path="/community" element={<Community />} />
              <Route path="/creators" element={<CreatorDirectory />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/faq" element={<AllFaqs />} />
              <Route path="/admin-portal" element={<AdminPortal />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/:username" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AdminStatusProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
