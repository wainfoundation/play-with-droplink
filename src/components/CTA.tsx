
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="gradient-hero text-white py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto text-center relative z-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Launch Your Droplink?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of creators on Pi Network and start growing your audience today.
        </p>
        <Link 
          to="/signup" 
          className="inline-block bg-white text-primary font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-opacity-90 hover:transform hover:scale-105 transition-all duration-300"
        >
          Get Started for Free
        </Link>
        <p className="mt-4 text-sm opacity-80">No credit card required.</p>
      </div>
    </section>
  );
};

export default CTA;
