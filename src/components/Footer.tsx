
import { Link } from "react-router-dom";
import { Heart, Github, Twitter, Mail, Globe, Play, Coins, Users, Shield } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary/5 to-secondary/5 border-t border-primary/10 mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/mascot-favicon.svg" 
                alt="PlayDrop" 
                className="w-12 h-12"
              />
              <div>
                <h3 className="text-2xl font-bold text-primary">PlayDrop</h3>
                <p className="text-sm text-gray-600">Your Pi Network Virtual Pet</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
              Experience the joy of caring for your adorable droplet companion in the Pi Network ecosystem. 
              Play mini-games, earn Pi rewards, and watch your pet grow happier every day!
            </p>
            
            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Play className="w-4 h-4 text-primary" />
                <span>Interactive Games</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Coins className="w-4 h-4 text-primary" />
                <span>Earn Pi Rewards</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4 text-primary" />
                <span>Pi Community</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-primary" />
                <span>Secure & Safe</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.a
                href="https://github.com/mrwain"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com/playdrop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:support@playdrop.app"
                className="text-gray-400 hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Game Features */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Game Features</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/play" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Pet Care System
                </Link>
              </li>
              <li>
                <Link to="/games" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Mini Games
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Item Shop
                </Link>
              </li>
              <li>
                <Link to="/inventory" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Inventory
                </Link>
              </li>
              <li>
                <Link to="/wallet" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Pi Wallet
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Support & Info</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <Globe className="w-4 h-4" />
                MRWAIN ORGANIZATION
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600">
              © 2025 PlayDrop by MRWAIN ORGANIZATION. All rights reserved.
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for the Pi Network community</span>
            </div>
          </div>
          
          {/* Pi Network Attribution */}
          <div className="text-center mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              PlayDrop is an independent game built for the Pi Network ecosystem. 
              Pi Network™ is a trademark of Pi Community Company.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
