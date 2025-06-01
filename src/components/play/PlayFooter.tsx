
import React from 'react';
import { Link } from 'react-router-dom';

const PlayFooter: React.FC = () => {
  return (
    <footer className="mt-16 border-t bg-white shadow-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <Link 
            to="/privacy" 
            className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            Privacy Policy
          </Link>
          <Link 
            to="/terms" 
            className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            Terms of Service
          </Link>
        </div>
        <div className="text-center mt-4 text-sm text-gray-500">
          © {new Date().getFullYear()} Droplink Gaming. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default PlayFooter;
