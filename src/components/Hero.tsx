
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
    
    return () => {
      const highestId = window.setTimeout(() => {}, 0);
      for (let i = 0; i < highestId; i++) {
        clearTimeout(i);
      }
    };
  }, []);
  
  return (
    <section className="relative overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-secondary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)]" />
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="relative z-20 container mx-auto px-6 py-28 md:py-32 min-h-[600px] flex items-center">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="animate-fade-in opacity-0 transform translate-y-5" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
              </svg>
              <span className="text-sm font-medium">Powered by Pi Network</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in opacity-0 transform translate-y-5" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Unify Your World with
            </span>
            <br />
            <span className="bg-gradient-to-r from-white to-primary-foreground bg-clip-text text-transparent font-black">
              Droplink
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl mb-10 text-white/90 animate-fade-in opacity-0 transform translate-y-5" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            Empower <span ref={typedTextRef} className="font-semibold text-primary-foreground border-r-2 border-white animate-pulse"></span> on Pi Network with one link to share, sell, and connect seamlessly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in opacity-0 transform translate-y-5" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <Link 
              to="/signup" 
              className="group relative overflow-hidden bg-white text-primary font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl transform"
            >
              <span className="relative z-10">Create Your Droplink</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link 
              to="/demo" 
              className="group relative overflow-hidden bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:bg-white hover:text-primary hover:scale-105 hover:shadow-2xl transform"
            >
              <span className="relative z-10">See It in Action</span>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-16 animate-fade-in opacity-0 transform translate-y-5" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            <p className="text-sm text-white/70 mb-4">Trusted by Pi Network pioneers worldwide</p>
            <div className="flex items-center justify-center gap-8 text-white/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm">Live on Pi Mainnet</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Verified Platform</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Floating Icons */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="floating-icon top-[15%] left-[10%] text-4xl md:text-6xl opacity-20 animate-float">
          📺
        </div>
        <div className="floating-icon top-[25%] right-[10%] text-4xl md:text-6xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>
          💌
        </div>
        <div className="floating-icon top-[45%] left-[15%] text-4xl md:text-6xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>
          💰
        </div>
        <div className="floating-icon bottom-[20%] right-[20%] text-4xl md:text-6xl opacity-20 animate-float" style={{ animationDelay: '3s' }}>
          🚀
        </div>
      </div>
    </section>
  );
};

export default Hero;
