
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from './pages/Index';
import Pricing from './pages/Pricing';
import Help from './pages/Help';
import NotFound from './pages/NotFound';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from '@/context/UserContext';
import DroplinkRedirect from './pages/DroplinkRedirect';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/help" element={<Help />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/droplink/:id" element={<DroplinkRedirect />} />
            </Routes>
            <Toaster />
          </ThemeProvider>
        </UserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
