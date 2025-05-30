
import React, { useEffect, useState } from 'react';

const WelcomeDroplet = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the droplet after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed top-20 right-8 z-50 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
    }`}>
      <div className="relative">
        {/* Main droplet body */}
        <div className="droplet-body relative">
          <svg
            width="120"
            height="140"
            viewBox="0 0 120 140"
            className="animate-bounce-gentle"
          >
            {/* Droplet shape */}
            <path
              d="M60 10 C35 35, 20 60, 20 85 C20 110, 35 130, 60 130 C85 130, 100 110, 100 85 C100 60, 85 35, 60 10 Z"
              fill="url(#dropletGradient)"
              className="animate-pulse-gentle"
            />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="dropletGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00aaff" />
                <stop offset="50%" stopColor="#0099ee" />
                <stop offset="100%" stopColor="#0077cc" />
              </linearGradient>
            </defs>
            
            {/* Highlight */}
            <ellipse
              cx="45"
              cy="40"
              rx="8"
              ry="12"
              fill="rgba(255, 255, 255, 0.6)"
              className="animate-shimmer"
            />
            
            {/* Face */}
            {/* Eyes */}
            <circle cx="48" cy="65" r="4" fill="#fff" />
            <circle cx="72" cy="65" r="4" fill="#fff" />
            <circle cx="49" cy="66" r="2" fill="#333" className="animate-blink" />
            <circle cx="73" cy="66" r="2" fill="#333" className="animate-blink" />
            
            {/* Smile */}
            <path
              d="M50 80 Q60 90 70 80"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              className="animate-smile"
            />
          </svg>
          
          {/* Left hand */}
          <div className="absolute -left-8 top-12 animate-wave-left">
            <svg width="30" height="40" viewBox="0 0 30 40">
              <path
                d="M5 15 Q8 10, 12 12 Q16 8, 20 12 Q24 10, 25 15 Q25 20, 22 25 Q18 30, 12 28 Q8 25, 5 20 Z"
                fill="#00aaff"
                stroke="#0077cc"
                strokeWidth="1"
              />
              {/* Fingers */}
              <circle cx="12" r="2" fill="#00aaff" className="animate-finger-wave" />
              <circle cx="16" r="2" fill="#00aaff" className="animate-finger-wave delay-100" />
              <circle cx="20" r="2" fill="#00aaff" className="animate-finger-wave delay-200" />
            </svg>
          </div>
          
          {/* Right hand */}
          <div className="absolute -right-8 top-12 animate-wave-right">
            <svg width="30" height="40" viewBox="0 0 30 40">
              <path
                d="M25 15 Q22 10, 18 12 Q14 8, 10 12 Q6 10, 5 15 Q5 20, 8 25 Q12 30, 18 28 Q22 25, 25 20 Z"
                fill="#00aaff"
                stroke="#0077cc"
                strokeWidth="1"
              />
              {/* Fingers */}
              <circle cx="18" r="2" fill="#00aaff" className="animate-finger-wave" />
              <circle cx="14" r="2" fill="#00aaff" className="animate-finger-wave delay-100" />
              <circle cx="10" r="2" fill="#00aaff" className="animate-finger-wave delay-200" />
            </svg>
          </div>
          
          {/* Left leg */}
          <div className="absolute -left-4 bottom-2 animate-leg-kick-left">
            <svg width="25" height="35" viewBox="0 0 25 35">
              <ellipse cx="12" cy="17" rx="6" ry="15" fill="#00aaff" stroke="#0077cc" strokeWidth="1" />
              {/* Foot */}
              <ellipse cx="12" cy="30" rx="8" ry="4" fill="#0077cc" />
            </svg>
          </div>
          
          {/* Right leg */}
          <div className="absolute -right-4 bottom-2 animate-leg-kick-right">
            <svg width="25" height="35" viewBox="0 0 25 35">
              <ellipse cx="13" cy="17" rx="6" ry="15" fill="#00aaff" stroke="#0077cc" strokeWidth="1" />
              {/* Foot */}
              <ellipse cx="13" cy="30" rx="8" ry="4" fill="#0077cc" />
            </svg>
          </div>
        </div>
        
        {/* Speech bubble */}
        <div className="absolute -top-16 -left-20 bg-white rounded-lg px-4 py-2 shadow-lg animate-fade-in-up delay-1000">
          <div className="text-sm font-medium text-primary">Welcome to Droplink! 👋</div>
          <div className="absolute bottom-0 left-8 transform translate-y-full">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes bounce-gentle {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes wave-left {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(15deg); }
        }
        
        @keyframes wave-right {
          0%, 100% { transform: rotate(15deg); }
          50% { transform: rotate(-15deg); }
        }
        
        @keyframes leg-kick-left {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(10deg); }
        }
        
        @keyframes leg-kick-right {
          0%, 100% { transform: rotate(5deg); }
          50% { transform: rotate(-10deg); }
        }
        
        @keyframes finger-wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        
        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        
        @keyframes shimmer {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes smile {
          0%, 100% { stroke-dasharray: 0, 100; }
          50% { stroke-dasharray: 20, 100; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 3s ease-in-out infinite;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 2s ease-in-out infinite;
        }
        
        .animate-wave-left {
          animation: wave-left 1.5s ease-in-out infinite;
        }
        
        .animate-wave-right {
          animation: wave-right 1.5s ease-in-out infinite;
        }
        
        .animate-leg-kick-left {
          animation: leg-kick-left 2s ease-in-out infinite;
        }
        
        .animate-leg-kick-right {
          animation: leg-kick-right 2s ease-in-out infinite;
        }
        
        .animate-finger-wave {
          animation: finger-wave 1s ease-in-out infinite;
        }
        
        .animate-blink {
          animation: blink 4s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        
        .animate-smile {
          animation: smile 3s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
        
        .delay-100 {
          animation-delay: 0.1s;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default WelcomeDroplet;
