
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { UserProvider } from "@/context/UserContext";
import SplashWrapper from "@/components/welcome/SplashWrapper";
import Index from "./pages/Index";
import Login from "./pages/Login";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
import SignupPage from "./pages/SignupPage";
import AuthPage from "./pages/AuthPage";
import PlayWithMascot from "./pages/PlayWithMascot";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <SplashWrapper>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login-page" element={<LoginPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signup-page" element={<SignupPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/play" element={<PlayWithMascot />} />
              </Routes>
            </BrowserRouter>
          </SplashWrapper>
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
