
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, HelpCircle, FileText, Users, Shield, Cookie, Link as LinkIcon, Activity } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-purple-600/10 to-yellow-400/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-6 md:col-span-2">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/2c117775-cd88-4aec-819b-0723e4f0dbe5.png" 
                alt="Droplink Logo" 
                className="w-10 h-10"
              />
              <span className="font-display font-bold text-2xl text-white">Droplink</span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              The ultimate link-in-bio platform for Pi Network creators. Monetize your audience, 
              showcase your digital presence, and drive Pi Network adoption with premium templates and tools.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="https://instagram.com/droplink.space" aria-label="Instagram" className="bg-white/10 hover:bg-primary/20 p-3 rounded-xl transition-all duration-300 hover:scale-105">
                <Instagram size={20} className="text-white" />
              </a>
              <a href="https://twitter.com/droplink_space" aria-label="Twitter" className="bg-white/10 hover:bg-primary/20 p-3 rounded-xl transition-all duration-300 hover:scale-105">
                <Twitter size={20} className="text-white" />
              </a>
              <a href="https://facebook.com/droplink.space" aria-label="Facebook" className="bg-white/10 hover:bg-primary/20 p-3 rounded-xl transition-all duration-300 hover:scale-105">
                <Facebook size={20} className="text-white" />
              </a>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <h3 className="font-display font-semibold text-xl mb-4 text-white">Stay Updated</h3>
              <p className="text-gray-300 mb-4">Get the latest updates on Pi Network features and creator tools.</p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Mail size={16} /> Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-6">
            <h3 className="font-display font-semibold text-xl text-white">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-primary transition-colors duration-300 text-lg">About</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-primary transition-colors duration-300 text-lg">Blog</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-primary transition-colors duration-300 text-lg">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-primary transition-colors duration-300 text-lg">Contact</Link></li>
              <li><Link to="/status" className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center gap-2 text-lg">
                <Activity size={16} /> System Status
              </Link></li>
            </ul>
          </div>

          {/* Resources & Legal */}
          <div className="space-y-6">
            <h3 className="font-display font-semibold text-xl text-white">Resources & Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/help" className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center gap-2 text-lg">
                <HelpCircle size={16} /> Help Center
              </Link></li>
              <li><Link to="/templates" className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center gap-2 text-lg">
                <FileText size={16} /> Templates
              </Link></li>
              <li><Link to="/creators" className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center gap-2 text-lg">
                <Users size={16} /> Creator Directory
              </Link></li>
              <li><Link to="/developers" className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center gap-2 text-lg">
                <LinkIcon size={16} /> Developers
              </Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center gap-2 text-lg">
                <FileText size={16} /> Terms of Service
              </Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center gap-2 text-lg">
                <Shield size={16} /> Privacy Policy
              </Link></li>
              <li><Link to="/cookies" className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center gap-2 text-lg">
                <Cookie size={16} /> Cookie Policy
              </Link></li>
              <li><Link to="/gdpr" className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center gap-2 text-lg">
                <Shield size={16} /> GDPR Compliance
              </Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-lg mb-2">
                © {new Date().getFullYear()} Droplink.space. All rights reserved.
              </p>
              <p className="text-sm text-gray-500">
                Built for the Pi Network community. Powered by Pi Network technology.
              </p>
            </div>
            
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/10">
              <span className="text-primary text-2xl">π</span>
              <div className="text-right">
                <p className="text-white font-semibold">Powered by Pi Network</p>
                <p className="text-gray-400 text-sm">Building the future together</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
