
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Auth from './pages/Auth';
import CoinStore from './pages/CoinStore';
import { Toaster } from '@/components/ui/toaster';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/coin-store" element={<CoinStore />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
