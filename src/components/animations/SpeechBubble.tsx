
import React from 'react';

const SpeechBubble = () => {
  return (
    <div className="absolute -top-16 -left-20 bg-white rounded-lg px-4 py-2 shadow-lg animate-fade-in-up delay-1000">
      <div className="text-sm font-medium text-primary">Welcome to Droplink! 👋</div>
      <div className="absolute bottom-0 left-8 transform translate-y-full">
        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
      </div>
    </div>
  );
};

export default SpeechBubble;
