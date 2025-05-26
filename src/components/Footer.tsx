
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, HelpCircle, FileText, Users, Shield, Cookie, Link as LinkIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Water wave background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/10 via-transparent to-primary/10 animate-wave"></div>
      </div>
      
      <div className="relative py-16 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-6">
            {/* Logo matching navbar */}
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <img 
                  src="/lovable-uploads/1dc40f50-2eba-46b0-a495-962b97bfaf8d.png" 
                  alt="Droplink Logo" 
                  className="w-10 h-10 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="font-poppins font-bold text-2xl hero-title">Droplink</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Unify your links, sell products, and earn Pi on Pi Network with one elegant page.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/droplink.space" 
                aria-label="Instagram" 
                className="text-primary hover:text-secondary transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-primary/10"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://twitter.com/droplink_space" 
                aria-label="Twitter" 
                className="text-primary hover:text-secondary transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-primary/10"
              >
                <Twitter size={24} />
              </a>
              <a 
                href="https://facebook.com/droplink.space" 
                aria-label="Facebook" 
                className="text-primary hover:text-secondary transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-primary/10"
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-poppins font-semibold text-lg text-primary">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">About</Link></li>
              <li><Link to="/blog" className="text-sm hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Blog</Link></li>
              <li><Link to="/careers" className="text-sm hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Careers</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Contact</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-poppins font-semibold text-lg text-primary">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/help" className="text-sm hover:text-primary transition-colors duration-300 flex items-center gap-2 group">
                <HelpCircle size={16} className="group-hover:scale-110 transition-transform" /> Help Center
              </Link></li>
              <li><Link to="/templates" className="text-sm hover:text-primary transition-colors duration-300 flex items-center gap-2 group">
                <FileText size={16} className="group-hover:scale-110 transition-transform" /> Templates
              </Link></li>
              <li><Link to="/creators" className="text-sm hover:text-primary transition-colors duration-300 flex items-center gap-2 group">
                <Users size={16} className="group-hover:scale-110 transition-transform" /> Creator Directory
              </Link></li>
              <li><Link to="/developers" className="text-sm hover:text-primary transition-colors duration-300 flex items-center gap-2 group">
                <LinkIcon size={16} className="group-hover:scale-110 transition-transform" /> Developers
              </Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-poppins font-semibold text-lg text-primary">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/terms" className="text-sm hover:text-primary transition-colors duration-300 flex items-center gap-2 group">
                <FileText size={16} className="group-hover:scale-110 transition-transform" /> Terms of Service
              </Link></li>
              <li><Link to="/privacy" className="text-sm hover:text-primary transition-colors duration-300 flex items-center gap-2 group">
                <Shield size={16} className="group-hover:scale-110 transition-transform" /> Privacy Policy
              </Link></li>
              <li><Link to="/cookies" className="text-sm hover:text-primary transition-colors duration-300 flex items-center gap-2 group">
                <Cookie size={16} className="group-hover:scale-110 transition-transform" /> Cookie Policy
              </Link></li>
              <li><Link to="/gdpr" className="text-sm hover:text-primary transition-colors duration-300 flex items-center gap-2 group">
                <Shield size={16} className="group-hover:scale-110 transition-transform" /> GDPR Compliance
              </Link></li>
            </ul>

            <div className="mt-8 pt-4 border-t border-primary/20">
              <h3 className="font-poppins font-semibold text-lg mb-4 text-primary">Subscribe</h3>
              <form className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-3 rounded-lg border border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                />
                <button 
                  type="submit" 
                  className="cta-button flex items-center justify-center gap-2 text-sm"
                >
                  <Mail size={16} /> Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="container mx-auto mt-12 pt-6 border-t border-primary/20 text-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Droplink.space. All rights reserved.</p>
          <p className="mt-2 text-xs text-muted-foreground/80">Built by the community, for the community. Droplink is committed to helping creators thrive on Pi Network.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
