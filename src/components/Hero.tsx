
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-secondary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)]" />
      </div>
      
      {/* Mobile-optimized animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-48 sm:w-96 h-48 sm:h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 sm:w-64 h-32 sm:h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="relative z-20 container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-28 lg:py-32 min-h-[600px] sm:min-h-[700px] flex items-center">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fade-in opacity-0 transform translate-y-5" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/95 backdrop-blur-sm border border-primary/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 shadow-lg text-xs sm:text-sm">
              <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-bold text-primary">NEW: Link in Bio Platform</span>
              <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">BETA</div>
            </div>
          </div>
          
          {/* Main headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight animate-fade-in opacity-0 transform translate-y-5" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent block mb-2">
              Your Perfect
            </span>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-black block mb-2">
              Link in Bio
            </span>
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent block">
              Platform
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-8 sm:mb-12 text-muted-foreground animate-fade-in opacity-0 transform translate-y-5 max-w-4xl mx-auto px-4" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            Create a beautiful hub for all your links, products, and content. One URL to rule them all.
            <br className="hidden sm:block" />
            <strong className="text-primary text-sm sm:text-base md:text-lg lg:text-xl">droplink.space/yourname</strong>
          </p>

          {/* Example */}
          <div className="animate-fade-in opacity-0 transform translate-y-5 mb-8 sm:mb-12 px-4" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
            <div className="bg-white/95 backdrop-blur-sm border border-primary/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto shadow-xl">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base md:text-lg font-medium">
                <span className="text-primary font-bold">All your links</span>
                <span className="text-muted-foreground transform rotate-90 sm:rotate-0">→</span>
                <span className="text-secondary font-bold break-all sm:break-normal">One beautiful page</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">Share one link, showcase everything</p>
            </div>
          </div>
          
          {/* CTA buttons */}
          <div className="flex flex-col gap-4 sm:gap-6 justify-center animate-fade-in opacity-0 transform translate-y-5 mb-12 sm:mb-16 px-4" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <Link 
              to="/signup" 
              className="group relative overflow-hidden bg-primary text-white font-bold px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl transform text-sm sm:text-base lg:text-lg w-full sm:w-auto text-center"
            >
              <span className="relative z-10">Start Building Your Hub</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link 
              to="/demo" 
              className="group relative overflow-hidden bg-transparent border-2 border-primary text-primary font-bold px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 hover:shadow-2xl transform text-sm sm:text-base lg:text-lg w-full sm:w-auto text-center"
            >
              <span className="relative z-10">View Live Demo</span>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="animate-fade-in opacity-0 transform translate-y-5 px-4" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Trusted by creators worldwide</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs sm:text-sm font-medium">Mobile Optimized</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-xs sm:text-sm font-medium">Analytics Included</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-xs sm:text-sm font-medium">Custom Themes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Icons */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="floating-icon top-[15%] left-[5%] sm:left-[10%] text-2xl sm:text-4xl md:text-6xl opacity-20 animate-float">
          🔗
        </div>
        <div className="floating-icon top-[25%] right-[5%] sm:right-[10%] text-2xl sm:text-4xl md:text-6xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>
          📱
        </div>
        <div className="floating-icon top-[45%] left-[10%] sm:left-[15%] text-2xl sm:text-4xl md:text-6xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>
          ⭐
        </div>
        <div className="floating-icon bottom-[20%] right-[10%] sm:right-[20%] text-2xl sm:text-4xl md:text-6xl opacity-20 animate-float" style={{ animationDelay: '3s' }}>
          🚀
        </div>
      </div>
    </section>
  );
};

export default Hero;
