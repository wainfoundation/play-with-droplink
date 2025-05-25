
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-muted/10 to-primary/5">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <div className="relative">
          {/* Enhanced decorative background elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent)]" />
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float" style={{ top: '20%', left: '10%', animationDelay: '0s' }} />
            <div className="absolute w-1 h-1 bg-secondary/30 rounded-full animate-float" style={{ top: '60%', left: '80%', animationDelay: '2s' }} />
            <div className="absolute w-3 h-3 bg-primary/10 rounded-full animate-float" style={{ top: '40%', left: '20%', animationDelay: '4s' }} />
            <div className="absolute w-1.5 h-1.5 bg-accent/40 rounded-full animate-float" style={{ top: '80%', left: '60%', animationDelay: '6s' }} />
          </div>
          
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
