
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="gradient-hero text-white py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto text-center relative z-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community Today</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Be part of a thriving ecosystem of creators building and connecting with the Pi community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/signup" 
            className="inline-block bg-white text-primary font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-opacity-90 hover:transform hover:scale-105 transition-all duration-300"
          >
            Get Started for Free
          </Link>
          <Link 
            to="/features" 
            className="inline-block border-2 border-white text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-white hover:bg-opacity-10 hover:transform hover:scale-105 transition-all duration-300"
          >
            Explore Features
          </Link>
        </div>
        <p className="mt-4 text-sm opacity-80">No credit card required. Community-powered with Pi payments.</p>
      </div>
    </section>
  );
};

export default CTA;
