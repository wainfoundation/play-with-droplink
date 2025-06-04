
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import GoToTop from '@/components/GoToTop';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Droplink.space - Your Digital Hub</title>
        <meta name="description" content="Create your personalized link-in-bio page and connect all your digital content in one place" />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <Features />
        </main>
        <Footer />
        <GoToTop />
      </div>
    </>
  );
};

export default Home;
