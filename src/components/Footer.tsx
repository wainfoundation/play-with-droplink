
import { Link } from "react-router-dom";
import { Heart, Github, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary/5 to-secondary/5 border-t border-primary/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/mascot-favicon.svg" 
                alt="Play with Droplink" 
                className="w-10 h-10"
              />
              <div>
                <h3 className="text-xl font-bold text-primary">Play with Droplink</h3>
                <p className="text-sm text-gray-600">Your Pi Network Gaming Hub</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Experience the joy of gaming and pet care in the Pi Network ecosystem. 
              Play games, earn Pi coins, and take care of your adorable pet droplet!
            </p>
            <div className="flex items-center space-x-4">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:contact@playwithroplink.com"
                className="text-gray-400 hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/play" className="text-gray-600 hover:text-primary transition-colors">
                  Play Games
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-gray-600 hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Game Features */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Game Features</h4>
            <ul className="space-y-2">
              <li className="text-gray-600">🐾 Pet Care System</li>
              <li className="text-gray-600">🎮 Mini Games</li>
              <li className="text-gray-600">💰 Pi Coin Rewards</li>
              <li className="text-gray-600">🏪 Pet Shop</li>
              <li className="text-gray-600">📈 Level Up System</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 mb-4 md:mb-0">
            © 2025 Play with Droplink by MRWAIN ORGANIZATION. All rights reserved.
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>for the Pi Network community</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
