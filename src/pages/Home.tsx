
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import DemoSection from "@/components/DemoSection";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Droplink.space - Link in Bio for Pi Network Creators</title>
        <meta name="description" content="Create your custom link in bio page, monetize content, and receive Pi payments. The best link in bio tool for Pi Network." />
        <meta property="og:title" content="Droplink.space - Link in Bio for Pi Network Creators" />
        <meta property="og:description" content="Create your custom link in bio page, monetize content, and receive Pi payments. The best link in bio tool for Pi Network." />
        <meta property="og:url" content="https://droplink.space" />
      </Helmet>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <DemoSection />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
};

export default Home;
