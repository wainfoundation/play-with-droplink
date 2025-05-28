import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from '@/context/UserContext';
import ProfilePage from '@/pages/ProfilePage';
import Dashboard from '@/pages/Dashboard';
import ProfileSetupWizard from '@/components/profile/ProfileSetupWizard';
import Auth from '@/pages/Auth';
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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile-setup" element={<ProfileSetupWizard />} />
            <Route path="*" element={<NotFound />} />
            
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
          </Routes>
        </Router>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
