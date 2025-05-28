
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { UserProvider } from "@/context/UserContext";
import Index from "./pages/Index";
import Register from "./pages/Register";
import SelectCategories from "./pages/register/SelectCategories";
import YourInformation from "./pages/register/YourInformation";
import SelectTemplate from "./pages/register/create/SelectTemplate";
import SelectPlatforms from "./pages/register/create/SelectPlatforms";
import AddLinks from "./pages/register/create/AddLinks";
import NameImageBio from "./pages/register/create/NameImageBio";
import Complete from "./pages/register/create/Complete";
import Auth from "./pages/Auth";
import UserInfo from "./pages/UserInfo";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Pricing from "./pages/Pricing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/userinfo" element={<UserInfo />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register/your-information" element={<YourInformation />} />
              <Route path="/register/select-categories" element={<SelectCategories />} />
              <Route path="/register/create/select-template" element={<SelectTemplate />} />
              <Route path="/register/create/select-platforms" element={<SelectPlatforms />} />
              <Route path="/register/create/add-links" element={<AddLinks />} />
              <Route path="/register/create/name-image-bio" element={<NameImageBio />} />
              <Route path="/register/create/complete" element={<Complete />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/pricing" element={<Pricing />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
