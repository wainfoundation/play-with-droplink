
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PiDomainFeatures from "@/components/PiDomainFeatures";
import PiDomainSetup from "@/components/PiDomainSetup";
import PiDomainShowcase from "@/components/PiDomainShowcase";
import Features from "@/components/Features";
import PiDomainTestimonials from "@/components/PiDomainTestimonials";
import HowItWorks from "@/components/HowItWorks";
import DemoSection from "@/components/DemoSection";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import CommunityLove from "@/components/CommunityLove";
import TemplatesShowcase from "@/components/TemplatesShowcase";
import CustomerSuccessStories from "@/components/CustomerSuccessStories";
import AppInfo from "@/components/AppInfo";
import GoToTop from "@/components/GoToTop";
import YouTubePlayer from "@/components/YouTubePlayer";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Connect Your .pi Domain to Droplink - Pi Network Link Hub</title>
        <meta name="description" content="Transform your .pi domain into a powerful business hub. Connect to Droplink for Pi payments, professional profiles, and seamless Pi Browser integration." />
        <meta name="keywords" content="pi domain, pi network, droplink, link in bio, pi payments, pi browser" />
        <meta property="og:title" content="Connect Your .pi Domain to Droplink - Pi Network Link Hub" />
        <meta property="og:description" content="Transform your .pi domain into a powerful business hub. Connect to Droplink for Pi payments, professional profiles, and seamless Pi Browser integration." />
        <meta property="og:url" content="https://droplink.space" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/10">
        <Navbar />
        <main className="overflow-x-hidden">
          <Hero />
          
          {/* Enhanced mobile spacing and layout */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent pointer-events-none" />
            
            {/* Mobile-optimized sections with better spacing */}
            <div className="space-y-8 sm:space-y-12 md:space-y-16">
              <PiDomainFeatures />
              <PiDomainShowcase />
              <CustomerSuccessStories />
              <YouTubePlayer />
              <PiDomainSetup />
              <HowItWorks />
              <DemoSection />
              <Features />
              <TemplatesShowcase />
              <PiDomainTestimonials />
              <CommunityLove />
              <FAQ />
              <AppInfo />
            </div>
          </div>
          
          <CTA />
        </main>
        <Footer />
        <GoToTop />
      </div>
    </>
  );
};

export default Home;
