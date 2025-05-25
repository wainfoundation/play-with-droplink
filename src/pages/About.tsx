
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">About Droplink</h1>
            <p className="text-xl text-muted-foreground">
              Empowering Pi Network creators with the ultimate link-in-bio platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                We believe in empowering creators and businesses within the Pi Network ecosystem. 
                Droplink provides the tools you need to showcase your work, connect with your audience, 
                and monetize your content using Pi cryptocurrency.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Why Pi Network?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Pi Network represents the future of digital currency - accessible, sustainable, 
                and community-driven. By building on Pi, we're creating a platform that grows 
                with the ecosystem and provides real value to its users.
              </p>
            </div>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-4">🔗</div>
                <h3 className="font-semibold mb-2">Smart Links</h3>
                <p className="text-sm text-muted-foreground">Unlimited customizable links with analytics</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-4">💰</div>
                <h3 className="font-semibold mb-2">Pi Payments</h3>
                <p className="text-sm text-muted-foreground">Accept tips and payments in Pi</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="font-semibold mb-2">Analytics</h3>
                <p className="text-sm text-muted-foreground">Track your performance and engagement</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Join the Pi Revolution</h2>
            <p className="text-muted-foreground mb-6">
              Ready to take your Pi Network presence to the next level?
            </p>
          </div>
        </div>
      </main>
      <CTA />
      <Footer />
    </div>
  );
};

export default About;
