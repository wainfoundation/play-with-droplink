
import React from 'react';

const DropletAnimations = () => {
  return (
    <style>
      {`
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
      `}
    </style>
  );
};

export default DropletAnimations;
