
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Coins, Gift } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Home: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <Hero />
      
      {/* Coin Store Button for logged-in users */}
      {isLoggedIn && (
        <div className="container mx-auto mt-4 mb-6 text-center">
          <Button 
            onClick={() => navigate('/coin-store')}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 text-lg flex items-center gap-2"
          >
            <Coins className="w-5 h-5" /> 
            Open Coin Store
            <Gift className="w-5 h-5" />
          </Button>
        </div>
      )}
      
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
