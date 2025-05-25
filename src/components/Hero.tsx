
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
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-secondary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)]" />
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="relative z-20 container mx-auto px-6 py-28 md:py-32 min-h-[700px] flex items-center">
        <div className="max-w-6xl mx-auto text-center">
          {/* Pi Domain Badge */}
          <div className="animate-fade-in opacity-0 transform translate-y-5" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 mb-8 shadow-lg">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-primary">NEW: Connect Your .pi Domain</span>
              <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">BETA</div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight animate-fade-in opacity-0 transform translate-y-5" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
              Connect Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-black">
              .pi Domain
            </span>
            <br />
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              to Droplink
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl mb-12 text-muted-foreground animate-fade-in opacity-0 transform translate-y-5 max-w-4xl mx-auto" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            Transform your Pi Network identity into a powerful hub. One memorable URL: <strong className="text-primary">yourname.pi</strong> → <strong className="text-secondary">droplink.space/@yourname</strong>
          </p>

          {/* Domain Example */}
          <div className="animate-fade-in opacity-0 transform translate-y-5 mb-12" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
            <div className="bg-white/95 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 max-w-2xl mx-auto shadow-xl">
              <div className="flex items-center justify-center gap-4 text-lg font-medium">
                <span className="text-primary font-bold">demo.pi</span>
                <span className="text-muted-foreground">→</span>
                <span className="text-secondary font-bold">droplink.space/@demo</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Same profile, accessible everywhere</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in opacity-0 transform translate-y-5 mb-16" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <Link 
              to="/signup" 
              className="group relative overflow-hidden bg-primary text-white font-bold px-10 py-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl transform text-lg"
            >
              <span className="relative z-10">Connect Your .pi Domain</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link 
              to="/demo" 
              className="group relative overflow-hidden bg-transparent border-2 border-primary text-primary font-bold px-10 py-5 rounded-2xl transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 hover:shadow-2xl transform text-lg"
            >
              <span className="relative z-10">View Live Demo</span>
            </Link>
          </div>
          
          {/* Trust indicators with Pi focus */}
          <div className="animate-fade-in opacity-0 transform translate-y-5" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            <p className="text-sm text-muted-foreground mb-6">Trusted by Pi Network pioneers worldwide</p>
            <div className="flex items-center justify-center gap-8 text-muted-foreground flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Pi Browser Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Pi Payments Integrated</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Mass Adoption Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Floating Icons with Pi theme */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="floating-icon top-[15%] left-[10%] text-4xl md:text-6xl opacity-20 animate-float">
          π
        </div>
        <div className="floating-icon top-[25%] right-[10%] text-4xl md:text-6xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>
          🔗
        </div>
        <div className="floating-icon top-[45%] left-[15%] text-4xl md:text-6xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>
          💎
        </div>
        <div className="floating-icon bottom-[20%] right-[20%] text-4xl md:text-6xl opacity-20 animate-float" style={{ animationDelay: '3s' }}>
          🌐
        </div>
      </div>
    </section>
  );
};

export default Hero;
