
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Careers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-primary">Join Our Team</h1>
            <p className="text-xl text-muted-foreground">
              Help us build the future of Pi Network creator tools
            </p>
          </div>
          
          <div className="space-y-8 mb-12">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Frontend Developer</h2>
              <p className="text-muted-foreground mb-4">
                Join our team to build beautiful, responsive user interfaces for the Pi Network ecosystem.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">React</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">TypeScript</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Tailwind</span>
              </div>
              <button className="text-primary hover:text-primary/80 font-medium">
                Apply Now
              </button>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Backend Developer</h2>
              <p className="text-muted-foreground mb-4">
                Build scalable APIs and integrate with Pi Network's payment systems.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">Node.js</span>
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">Supabase</span>
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">Pi SDK</span>
              </div>
              <button className="text-primary hover:text-primary/80 font-medium">
                Apply Now
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Don't see a position that fits? We're always looking for talented individuals.
            </p>
            <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90">
              Contact Us
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
