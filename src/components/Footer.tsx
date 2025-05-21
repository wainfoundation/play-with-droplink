
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, HelpCircle, FileText, Users, Shield, Cookie, Link as LinkIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted py-16 px-4 relative overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="space-y-6">
          <div className="flex items-center gap-2 font-poppins font-bold text-2xl text-primary">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zM7.83 14c.37 0 .67.26.74.62.41 2.22 2.28 2.98 3.64 2.87.43-.02.79.32.79.75 0 .4-.32.73-.72.75-2.13.13-4.62-1.09-5.19-4.12-.08-.45.28-.87.74-.87z"/>
            </svg>
            Droplink
          </div>
          <p className="text-sm">
            Unify your links, sell products, and earn Pi on Pi Network with one elegant page.
          </p>
          <div className="flex gap-4">
            <a href="https://instagram.com/droplink.space" aria-label="Instagram" className="text-primary hover:text-secondary transition-colors">
              <Instagram size={24} />
            </a>
            <a href="https://twitter.com/droplink_space" aria-label="Twitter" className="text-primary hover:text-secondary transition-colors">
              <Twitter size={24} />
            </a>
            <a href="https://facebook.com/droplink.space" aria-label="Facebook" className="text-primary hover:text-secondary transition-colors">
              <Facebook size={24} />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-poppins font-semibold text-lg">Company</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-sm hover:text-primary transition-colors">About</Link></li>
            <li><Link to="/blog" className="text-sm hover:text-primary transition-colors">Blog</Link></li>
            <li><Link to="/careers" className="text-sm hover:text-primary transition-colors">Careers</Link></li>
            <li><Link to="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-poppins font-semibold text-lg">Resources</h3>
          <ul className="space-y-2">
            <li><Link to="/help" className="text-sm hover:text-primary transition-colors flex items-center gap-2">
              <HelpCircle size={16} /> Help Center
            </Link></li>
            <li><Link to="/templates" className="text-sm hover:text-primary transition-colors flex items-center gap-2">
              <FileText size={16} /> Templates
            </Link></li>
            <li><Link to="/creators" className="text-sm hover:text-primary transition-colors flex items-center gap-2">
              <Users size={16} /> Creator Directory
            </Link></li>
            <li><Link to="/developers" className="text-sm hover:text-primary transition-colors flex items-center gap-2">
              <LinkIcon size={16} /> Developers
            </Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-poppins font-semibold text-lg">Legal</h3>
          <ul className="space-y-2">
            <li><Link to="/terms" className="text-sm hover:text-primary transition-colors flex items-center gap-2">
              <FileText size={16} /> Terms of Service
            </Link></li>
            <li><Link to="/privacy" className="text-sm hover:text-primary transition-colors flex items-center gap-2">
              <Shield size={16} /> Privacy Policy
            </Link></li>
            <li><Link to="/cookies" className="text-sm hover:text-primary transition-colors flex items-center gap-2">
              <Cookie size={16} /> Cookie Policy
            </Link></li>
          </ul>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <h3 className="font-poppins font-semibold text-lg mb-2">Subscribe</h3>
            <form className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-secondary transition-colors flex items-center justify-center gap-2"
              >
                <Mail size={16} /> Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-12 pt-6 border-t border-gray-200 text-center text-sm">
        <p>© {new Date().getFullYear()} Droplink.space. All rights reserved.</p>
        <p className="mt-2 text-xs text-gray-500">Built by the community, for the community. Droplink is committed to helping creators thrive on Pi Network.</p>
      </div>
    </footer>
  );
};

export default Footer;
