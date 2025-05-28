
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from '@/context/UserContext';
import ProfilePage from '@/pages/ProfilePage';
import Dashboard from '@/pages/Dashboard';
import ProfileSetupWizard from '@/components/profile/ProfileSetupWizard';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import AuthUserInfo from "@/pages/AuthUserInfo";
import RegisterIntent from "@/pages/RegisterIntent";
import RegisterPlan from "@/pages/RegisterPlan";
import RegisterTemplate from "@/pages/RegisterTemplate";
import RegisterPlatforms from "@/pages/RegisterPlatforms";
import RegisterLinks from "@/pages/RegisterLinks";
import RegisterProfile from "@/pages/RegisterProfile";
import RegisterComplete from "@/pages/RegisterComplete";
import AdminDashboard from "@/pages/AdminDashboard";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import Features from "@/pages/Features";
import Pricing from "@/pages/Pricing";
import Demo from "@/pages/Demo";
import Templates from "@/pages/Templates";
import Help from "@/pages/Help";
import Store from "@/pages/Store";
import Groups from "@/pages/Groups";
import Stickers from "@/pages/Stickers";
import About from "@/pages/About";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/help" element={<Help />} />
            <Route path="/store" element={<Store />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/stickers" element={<Stickers />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile-setup" element={<ProfileSetupWizard onComplete={() => {}} />} />
            
            {/* Onboarding Routes */}
            <Route path="/auth/userinfo" element={<AuthUserInfo />} />
            <Route path="/register/your-information" element={<RegisterIntent />} />
            <Route path="/register/select-categories" element={<RegisterPlan />} />
            <Route path="/register/create/select-template" element={<RegisterTemplate />} />
            <Route path="/register/create/select-platforms" element={<RegisterPlatforms />} />
            <Route path="/register/create/add-links" element={<RegisterLinks />} />
            <Route path="/register/create/name-image-bio" element={<RegisterProfile />} />
            <Route path="/register/create/complete" element={<RegisterComplete />} />
            
            {/* Admin Dashboard */}
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
