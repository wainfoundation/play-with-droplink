import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Play from './pages/Play';
import Auth from './pages/Auth';
import Pricing from './pages/Pricing';
import Help from './pages/Help';
import NotFound from './pages/NotFound';
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { UserProvider } from '@/context/UserContext';
import { QueryClient } from '@tanstack/react-query';
import DroplinkRedirect from './pages/DroplinkRedirect';

function App() {
  return (
    <BrowserRouter>
      <QueryClient>
        <UserProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/play" element={<Play />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/help" element={<Help />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/droplink/:id" element={<DroplinkRedirect />} />
            </Routes>
            <Toaster />
          </ThemeProvider>
        </UserProvider>
      </QueryClient>
    </BrowserRouter>
  );
}

export default App;
