
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import MobilePreview from "@/components/MobilePreview";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-muted/20 to-primary/10">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <div className="relative">
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent pointer-events-none" />
          <HowItWorks />
          <MobilePreview />
          <Features />
          <Testimonials />
          <FAQ />
        </div>
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
