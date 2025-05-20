
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const typedTextRef = useRef<HTMLSpanElement>(null);
  const words = ['creators', 'entrepreneurs', 'influencers', 'artists', 'developers'];
  
  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    const type = () => {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        if (typedTextRef.current) {
          typedTextRef.current.textContent = currentWord.substring(0, charIndex - 1);
        }
        charIndex--;
        typingSpeed = 50;
      } else {
        if (typedTextRef.current) {
          typedTextRef.current.textContent = currentWord.substring(0, charIndex + 1);
        }
        charIndex++;
        typingSpeed = 150;
      }
      
      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingSpeed = 1500;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
      }
      
      setTimeout(type, typingSpeed);
    };
    
    setTimeout(type, 500);
    
    // Fix: Added a proper cleanup function
    return () => {
      // Clear any pending timeouts
      const highestId = window.setTimeout(() => {}, 0);
      for (let i = 0; i < highestId; i++) {
        clearTimeout(i);
      }
    };
  }, []);
  
  return (
    <section className="gradient-hero text-white py-28 px-6 md:py-32 min-h-[500px] md:min-h-[600px] flex items-center">
      <div className="container mx-auto relative z-20">
        <div className="max-w-3xl mx-auto text-center animate-fade-in opacity-0 transform translate-y-5">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Unify Your World with Droplink
          </h1>
          <p className="text-xl md:text-2xl mb-10">
            Empower <span ref={typedTextRef} className="font-semibold border-r-2 border-white"></span> on Pi Network with one link to share, sell, and connect seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="cta-button">Create Your Droplink</Link>
            <Link to="/demo" className="cta-button-outline">See It in Action</Link>
          </div>
        </div>
      </div>
      
      {/* Floating Icons */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="floating-icon top-[15%] left-[10%] text-5xl">
          <i className="fab fa-youtube">📺</i>
        </div>
        <div className="floating-icon top-[25%] right-[10%] text-5xl animation-delay-300">
          <i className="fab fa-telegram">✉️</i>
        </div>
        <div className="floating-icon top-[45%] left-[15%] text-5xl animation-delay-600">
          <i className="fab fa-coins">💰</i>
        </div>
      </div>
    </section>
  );
};

export default Hero;
