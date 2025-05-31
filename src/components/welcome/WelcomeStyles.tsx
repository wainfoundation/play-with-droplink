
import React from 'react';

const WelcomeStyles: React.FC = () => {
  return (
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
      
      @keyframes gentle-blink {
        0%, 90%, 100% { transform: scaleY(1); }
        95% { transform: scaleY(0.1); }
      }
      
      @keyframes shimmer {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 1; }
      }
      
      .animate-bounce-gentle {
        animation: bounce-gentle 4s ease-in-out infinite;
      }
      
      .animate-pulse-gentle {
        animation: pulse-gentle 3s ease-in-out infinite;
      }
      
      .animate-gentle-blink {
        animation: gentle-blink 5s ease-in-out infinite;
      }
      
      .animate-shimmer {
        animation: shimmer 2.5s ease-in-out infinite;
      }
      `}
    </style>
  );
};

export default WelcomeStyles;
