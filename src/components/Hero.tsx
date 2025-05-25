
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const typedTextRef = useRef<HTMLSpanElement>(null);
  const words = ['creators', 'entrepreneurs', 'influencers', 'artists', 'developers', 'pioneers'];
  
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
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Enhanced gradient background with Pi Network theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/15">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent)]" />
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="relative z-20 container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-fade-in opacity-0 transform translate-y-5" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 mb-8 shadow-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-primary">Powered by Pi Network</span>
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
              </svg>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-fade-in opacity-0 transform translate-y-5" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Your Pi Domain
            </span>
            <br />
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent font-black">
              Awaits
            </span>
          </h1>
          
          <p className="text-xl md:text-3xl lg:text-4xl mb-12 text-muted-foreground font-light animate-fade-in opacity-0 transform translate-y-5" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            Create your <span className="font-semibold text-primary">.pi domain</span> and empower{' '}
            <span ref={typedTextRef} className="font-semibold text-secondary border-r-2 border-primary animate-pulse"></span>{' '}
            with one powerful link to share, sell, and connect on Pi Network.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in opacity-0 transform translate-y-5" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <Link 
              to="/signup" 
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-white font-bold px-10 py-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl transform text-lg"
            >
              <span className="relative z-10">Claim Your .pi Domain</span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link 
              to="/demo" 
              className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border-2 border-primary text-primary font-bold px-10 py-5 rounded-2xl transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 hover:shadow-2xl transform text-lg"
            >
              <span className="relative z-10">See Live Demo</span>
            </Link>
          </div>
          
          {/* Enhanced trust indicators */}
          <div className="animate-fade-in opacity-0 transform translate-y-5" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            <p className="text-sm text-muted-foreground mb-6 font-medium">Join thousands of Pi Network pioneers worldwide</p>
            <div className="flex items-center justify-center gap-12 text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Live on Pi Mainnet</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Verified Platform</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">100% Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Floating Icons with Pi theme */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="floating-icon top-[15%] left-[10%] text-5xl md:text-7xl opacity-20 animate-float text-primary">
          🏠
        </div>
        <div className="floating-icon top-[25%] right-[10%] text-5xl md:text-7xl opacity-20 animate-float text-secondary" style={{ animationDelay: '1s' }}>
          🌐
        </div>
        <div className="floating-icon top-[45%] left-[15%] text-5xl md:text-7xl opacity-20 animate-float text-accent" style={{ animationDelay: '2s' }}>
          💎
        </div>
        <div className="floating-icon bottom-[20%] right-[20%] text-5xl md:text-7xl opacity-20 animate-float text-primary" style={{ animationDelay: '3s' }}>
          🚀
        </div>
        <div className="floating-icon bottom-[40%] left-[25%] text-4xl md:text-6xl opacity-15 animate-float text-secondary" style={{ animationDelay: '4s' }}>
          ⚡
        </div>
      </div>
    </section>
  );
};

export default Hero;
