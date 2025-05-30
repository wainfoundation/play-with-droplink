import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient } from "react-query";

import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Features from "@/pages/Features";
import Community from "@/pages/Community";
import Help from "@/pages/Help";
import NotFound from "@/pages/NotFound";
import UserContextProvider from "@/context/UserContext";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Admin from "@/pages/Admin";
import Short from "@/pages/Short";
import Forums from "@/pages/Forums";

function App() {
  return (
    <QueryClient>
      <HelmetProvider>
        <UserContextProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/features" element={<Features />} />
              <Route path="/community" element={<Community />} />
              <Route path="/help" element={<Help />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/s/:slug" element={<Short />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/forums" element={<Forums />} />
            </Routes>
          </Router>
        </UserContextProvider>
      </HelmetProvider>
    </QueryClient>
  );
}

export default App;
