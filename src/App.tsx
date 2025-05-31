
import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "@/components/SplashScreen";
import Welcome from "@/pages/Welcome";
import PlayWithMascot from "@/pages/PlayWithMascot";
import Help from "@/pages/Help";
import HelpArticle from "@/pages/HelpArticle";
import AllFaqs from "@/pages/AllFaqs";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";

const queryClient = new QueryClient();

function App() {
  const [currentPage, setCurrentPage] = useState<'splash' | 'welcome' | 'app'>('splash');
  
  const handleSplashComplete = () => {
    setCurrentPage('welcome');
  };

  const handleWelcomeComplete = () => {
    setCurrentPage('app');
  };

  // Show splash screen first
  if (currentPage === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // Show welcome screen next
  if (currentPage === 'welcome') {
    return <Welcome onEnter={handleWelcomeComplete} />;
  }

  // Show main app with routing
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<PlayWithMascot />} />
          <Route path="/play" element={<PlayWithMascot />} />
          <Route path="/help" element={<Help />} />
          <Route path="/help/article/:slug" element={<HelpArticle />} />
          <Route path="/faqs" element={<AllFaqs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
