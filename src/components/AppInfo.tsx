
import { Link } from "react-router-dom";
import { ExternalLink, Github, Twitter, Instagram, Mail } from "lucide-react";

const AppInfo = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Water-inspired background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 animate-wave"></div>
      </div>
      
      <div className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            {/* App Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <img 
                  src="/lovable-uploads/1dc40f50-2eba-46b0-a495-962b97bfaf8d.png" 
                  alt="Droplink Logo" 
                  className="w-20 h-20 rounded-2xl shadow-2xl shadow-primary/30 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
            
            <h2 className="text-5xl font-bold mb-6 hero-title">Droplink</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The ultimate link-in-bio platform for Pi Network users. Connect your .pi domain, 
              accept Pi payments, and build your digital presence with beautiful water-inspired design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center feature-card">
              <h3 className="text-3xl font-bold mb-2 text-primary">10,000+</h3>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div className="text-center feature-card">
              <h3 className="text-3xl font-bold mb-2 text-primary">50,000π</h3>
              <p className="text-muted-foreground">Total Pi Earned</p>
            </div>
            <div className="text-center feature-card">
              <h3 className="text-3xl font-bold mb-2 text-primary">99.9%</h3>
              <p className="text-muted-foreground">Uptime</p>
            </div>
          </div>

          <div className="text-center">
            <div className="flex justify-center gap-6 mb-8">
              <a 
                href="https://github.com/droplink" 
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 p-3 rounded-full hover:bg-primary/10"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href="https://twitter.com/droplink_space" 
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 p-3 rounded-full hover:bg-primary/10"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a 
                href="https://instagram.com/droplink.space" 
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 p-3 rounded-full hover:bg-primary/10"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="mailto:hello@droplink.space" 
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 p-3 rounded-full hover:bg-primary/10"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Link 
                to="/about" 
                className="nav-link text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/10"
              >
                About Us
              </Link>
              <Link 
                to="/privacy" 
                className="nav-link text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/10"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="nav-link text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/10"
              >
                Terms of Service
              </Link>
              <Link 
                to="/help" 
                className="nav-link text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/10"
              >
                Help Center
              </Link>
              <a 
                href="https://status.droplink.space" 
                className="nav-link text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/10"
              >
                System Status
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppInfo;
