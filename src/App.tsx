
import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { HelmetProvider } from "react-helmet-async";
import SplashScreen from "./components/SplashScreen";
import { UserProvider } from "./context/UserContext";
import { UpgradeModalProvider } from "./hooks/useUpgradeModal";
import UpgradeModal from "./components/UpgradeModal";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Templates from "./pages/Templates";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

// App component
function App() {
  const [showSplash, setShowSplash] = React.useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <HelmetProvider>
      <UserProvider>
        <UpgradeModalProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/@:username" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            {/* Modal needs to be inside Router */}
            <UpgradeModalConsumer />
          </Router>
        </UpgradeModalProvider>
      </UserProvider>
    </HelmetProvider>
  );
}

// Component to consume the upgrade modal context and render the modal inside Router context
const UpgradeModalConsumer = () => {
  const navigate = useNavigate(); // Now this is inside Router context
  const { isModalOpen, featureName, closeUpgradeModal } = React.useContext(
    require('./hooks/useUpgradeModal').UpgradeModalContext
  );
  
  // Navigation handler to pass to the modal
  const handleNavigateToPricing = () => {
    navigate('/pricing');
  };
  
  return (
    <UpgradeModal 
      isOpen={isModalOpen} 
      onClose={closeUpgradeModal} 
      featureName={featureName}
      onNavigateToPricing={handleNavigateToPricing}
    />
  );
};

export default App;
