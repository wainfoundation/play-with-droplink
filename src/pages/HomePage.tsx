
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Droplink - Your Link in Bio Solution</title>
        <meta name="description" content="Create a beautiful link in bio page for your social media profiles. Easy to use, customizable, and free to get started." />
        <meta property="og:title" content="Droplink - Your Link in Bio Solution" />
        <meta property="og:description" content="Create a beautiful link in bio page for your social media profiles. Easy to use, customizable, and free to get started." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
