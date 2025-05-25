
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PiDomainFeatures from "@/components/PiDomainFeatures";
import PiDomainSetup from "@/components/PiDomainSetup";
import Features from "@/components/Features";
import PiDomainTestimonials from "@/components/PiDomainTestimonials";
import HowItWorks from "@/components/HowItWorks";
import DemoSection from "@/components/DemoSection";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
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
      <Navbar />
      <main>
        <Hero />
        <PiDomainFeatures />
        <PiDomainSetup />
        <Features />
        <PiDomainTestimonials />
        <HowItWorks />
        <DemoSection />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
};

export default Home;
