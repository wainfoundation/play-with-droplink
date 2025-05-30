
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Heart, Globe } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Welcome = () => {
  const [mascotVisible, setMascotVisible] = useState(false);
  const [welcomeTextVisible, setWelcomeTextVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Animated sequence
    const timer1 = setTimeout(() => setMascotVisible(true), 300);
    const timer2 = setTimeout(() => setWelcomeTextVisible(true), 1500);
    const timer3 = setTimeout(() => setButtonsVisible(true), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleEnter = () => {
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Welcome to Droplink - Your Pi Network Link Hub</title>
        <meta name="description" content="Welcome to Droplink! Transform your Pi domain into a powerful business hub." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 animate-bounce">
          <Sparkles className="text-primary/30 h-8 w-8" />
        </div>
        <div className="absolute top-40 right-32 animate-bounce delay-300">
          <Heart className="text-red-400/30 h-6 w-6" />
        </div>
        <div className="absolute bottom-32 left-32 animate-bounce delay-700">
          <Globe className="text-blue-400/30 h-7 w-7" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          {/* Mascot */}
          <div className={`transition-all duration-1000 ${
            mascotVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-10'
          }`}>
            <div className="relative mb-8">
              <svg
                width="200"
                height="240"
                viewBox="0 0 200 240"
                className="animate-bounce-gentle"
              >
                {/* Droplet shape */}
                <path
                  d="M100 20 C60 60, 35 100, 35 140 C35 185, 65 220, 100 220 C135 220, 165 185, 165 140 C165 100, 140 60, 100 20 Z"
                  fill="url(#welcomeDropletGradient)"
                  className="animate-pulse-gentle"
                />
                
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="welcomeDropletGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00aaff" />
                    <stop offset="50%" stopColor="#0099ee" />
                    <stop offset="100%" stopColor="#0077cc" />
                  </linearGradient>
                </defs>
                
                {/* Highlight */}
                <ellipse
                  cx="75"
                  cy="70"
                  rx="12"
                  ry="18"
                  fill="rgba(255, 255, 255, 0.6)"
                  className="animate-shimmer"
                />
                
                {/* Face */}
                {/* Eyes */}
                <circle cx="80" cy="110" r="6" fill="#fff" />
                <circle cx="120" cy="110" r="6" fill="#fff" />
                <circle cx="82" cy="112" r="3" fill="#333" className="animate-blink" />
                <circle cx="122" cy="112" r="3" fill="#333" className="animate-blink" />
                
                {/* Smile */}
                <path
                  d="M80 140 Q100 160 120 140"
                  stroke="#fff"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  className="animate-smile"
                />
              </svg>
              
              {/* Left hand */}
              <div className="absolute -left-12 top-20 animate-wave-left">
                <svg width="50" height="60" viewBox="0 0 50 60">
                  <path
                    d="M8 25 Q13 17, 20 20 Q27 13, 33 20 Q40 17, 42 25 Q42 33, 37 42 Q30 50, 20 47 Q13 42, 8 33 Z"
                    fill="#00aaff"
                    stroke="#0077cc"
                    strokeWidth="2"
                  />
                  {/* Fingers */}
                  <circle cx="20" cy="10" r="3" fill="#00aaff" className="animate-finger-wave" />
                  <circle cx="27" cy="8" r="3" fill="#00aaff" className="animate-finger-wave delay-100" />
                  <circle cx="33" cy="10" r="3" fill="#00aaff" className="animate-finger-wave delay-200" />
                </svg>
              </div>
              
              {/* Right hand */}
              <div className="absolute -right-12 top-20 animate-wave-right">
                <svg width="50" height="60" viewBox="0 0 50 60">
                  <path
                    d="M42 25 Q37 17, 30 20 Q23 13, 17 20 Q10 17, 8 25 Q8 33, 13 42 Q20 50, 30 47 Q37 42, 42 33 Z"
                    fill="#00aaff"
                    stroke="#0077cc"
                    strokeWidth="2"
                  />
                  {/* Fingers */}
                  <circle cx="30" cy="10" r="3" fill="#00aaff" className="animate-finger-wave" />
                  <circle cx="23" cy="8" r="3" fill="#00aaff" className="animate-finger-wave delay-100" />
                  <circle cx="17" cy="10" r="3" fill="#00aaff" className="animate-finger-wave delay-200" />
                </svg>
              </div>
              
              {/* Left leg */}
              <div className="absolute -left-6 bottom-8 animate-leg-kick-left">
                <svg width="40" height="55" viewBox="0 0 40 55">
                  <ellipse cx="20" cy="28" rx="10" ry="25" fill="#00aaff" stroke="#0077cc" strokeWidth="2" />
                  {/* Foot */}
                  <ellipse cx="20" cy="48" rx="12" ry="6" fill="#0077cc" />
                </svg>
              </div>
              
              {/* Right leg */}
              <div className="absolute -right-6 bottom-8 animate-leg-kick-right">
                <svg width="40" height="55" viewBox="0 0 40 55">
                  <ellipse cx="20" cy="28" rx="10" ry="25" fill="#00aaff" stroke="#0077cc" strokeWidth="2" />
                  {/* Foot */}
                  <ellipse cx="20" cy="48" rx="12" ry="6" fill="#0077cc" />
                </svg>
              </div>
            </div>
          </div>

          {/* Welcome Text */}
          <div className={`transition-all duration-1000 delay-500 ${
            welcomeTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
                Welcome to Droplink!
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-2">
              Your Pi Network Link Hub
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Transform your .pi domain into a powerful business hub with Pi payments, 
              professional profiles, and seamless Pi Browser integration.
            </p>
          </div>

          {/* Action Buttons */}
          <div className={`transition-all duration-1000 delay-1000 ${
            buttonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                onClick={handleEnter}
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transform transition hover:scale-105 duration-200 text-lg px-8 py-4"
              >
                Enter Droplink <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg" 
                className="hover:bg-blue-50 transition-colors text-lg px-8 py-4"
              >
                <Link to="/demo">Watch Demo</Link>
              </Button>
            </div>
          </div>
        </div>

        <style>
          {`
          @keyframes bounce-gentle {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-15px); }
            60% { transform: translateY(-8px); }
          }
          
          @keyframes pulse-gentle {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          
          @keyframes wave-left {
            0%, 100% { transform: rotate(-20deg); }
            50% { transform: rotate(20deg); }
          }
          
          @keyframes wave-right {
            0%, 100% { transform: rotate(20deg); }
            50% { transform: rotate(-20deg); }
          }
          
          @keyframes leg-kick-left {
            0%, 100% { transform: rotate(-8deg); }
            50% { transform: rotate(15deg); }
          }
          
          @keyframes leg-kick-right {
            0%, 100% { transform: rotate(8deg); }
            50% { transform: rotate(-15deg); }
          }
          
          @keyframes finger-wave {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
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
            50% { stroke-dasharray: 30, 100; }
          }
          
          .animate-bounce-gentle {
            animation: bounce-gentle 4s ease-in-out infinite;
          }
          
          .animate-pulse-gentle {
            animation: pulse-gentle 3s ease-in-out infinite;
          }
          
          .animate-wave-left {
            animation: wave-left 2s ease-in-out infinite;
          }
          
          .animate-wave-right {
            animation: wave-right 2s ease-in-out infinite;
          }
          
          .animate-leg-kick-left {
            animation: leg-kick-left 2.5s ease-in-out infinite;
          }
          
          .animate-leg-kick-right {
            animation: leg-kick-right 2.5s ease-in-out infinite;
          }
          
          .animate-finger-wave {
            animation: finger-wave 1.2s ease-in-out infinite;
          }
          
          .animate-blink {
            animation: blink 5s ease-in-out infinite;
          }
          
          .animate-shimmer {
            animation: shimmer 2.5s ease-in-out infinite;
          }
          
          .animate-smile {
            animation: smile 4s ease-in-out infinite;
          }
          
          .delay-100 {
            animation-delay: 0.1s;
          }
          
          .delay-200 {
            animation-delay: 0.2s;
          }
          `}
        </style>
      </div>
    </>
  );
};

export default Welcome;
