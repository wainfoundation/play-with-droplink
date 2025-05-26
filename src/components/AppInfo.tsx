
import { Link } from "react-router-dom";
import { ExternalLink, Github, Twitter, Instagram, Mail } from "lucide-react";

const AppInfo = () => {
  return (
    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {/* App Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zM7.83 14c.37 0 .67.26.74.62.41 2.22 2.28 2.98 3.64 2.87.43-.02.79.32.79.75 0 .4-.32.73-.72.75-2.13.13-4.62-1.09-5.19-4.12-.08-.45.28-.87.74-.87z"/>
              </svg>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold mb-4">Droplink</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The ultimate link-in-bio platform for Pi Network users. Connect your .pi domain, 
            accept Pi payments, and build your digital presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">10,000+</h3>
            <p className="text-muted-foreground">Active Users</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">50,000π</h3>
            <p className="text-muted-foreground">Total Pi Earned</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">99.9%</h3>
            <p className="text-muted-foreground">Uptime</p>
          </div>
        </div>

        <div className="text-center">
          <div className="flex justify-center gap-4 mb-8">
            <a href="https://github.com/droplink" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://twitter.com/droplink_space" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="https://instagram.com/droplink.space" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="mailto:hello@droplink.space" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
              About Us
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">
              Help Center
            </Link>
            <a href="https://status.droplink.space" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              System Status
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppInfo;
